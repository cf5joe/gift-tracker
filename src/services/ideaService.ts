import { getDatabase } from './database';
import { mapIdeaRow } from './mappers';
import { Idea } from '../types';
import { generateId } from '../utils/idGenerator';

export const ideaService = {
    async getAll(): Promise<Idea[]> {
        const db = await getDatabase();
        // Fetch ideas, ideally joined with recipient names
        const rows = await db.select<Record<string, any>[]>('SELECT * FROM ideas WHERE deleted_at IS NULL ORDER BY created_at DESC');
        return rows.map(mapIdeaRow);
    },

    async create(idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>): Promise<Idea> {
        const db = await getDatabase();
        const id = generateId('idea');
        const now = new Date().toISOString();

        const {
            recipientId, categoryId, name, description, estimatedPrice, sourceUrl, priority,
            notes, tags
        } = idea;

        try {
            await db.execute(
                `INSERT INTO ideas (
                id, recipient_id, category_id, name, description, estimated_price, source_url,
                priority, notes, tags, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    (recipientId && recipientId !== 'none') ? recipientId : null,
                    (categoryId && categoryId !== 'none') ? categoryId : null,
                    name,
                    description || null,
                    estimatedPrice || null,
                    sourceUrl || null,
                    priority || 3,
                    notes || null,
                    JSON.stringify(tags || []),
                    now,
                    now
                ]
            );
        } catch (error) {
            console.error('Failed to create idea:', error);
            throw error;
        }

        return {
            ...idea,
            id,
            createdAt: now,
            updatedAt: now,
        } as Idea;
    }
};
