import { getDatabase } from './database';
import { mapRecipientRow } from './mappers';
import { Recipient } from '../types';
import { generateId } from '../utils/idGenerator';

export const recipientService = {
    async getAll(): Promise<Recipient[]> {
        const db = await getDatabase();
        const rows = await db.select<Record<string, any>[]>('SELECT * FROM recipients WHERE deleted_at IS NULL ORDER BY name ASC');
        return rows.map(mapRecipientRow);
    },

    async create(recipient: Omit<Recipient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipient> {
        const db = await getDatabase();
        const id = generateId('rec');
        const now = new Date().toISOString();

        const {
            type, name, email, phone, addressLine1, addressLine2, city, state, postalCode, country,
            budgetLimit, interests, tags, avatarPath, isActive, notes
        } = recipient;

        // Handle subtype specific fields
        let birthday: string | undefined;
        let relationship: string | undefined;
        let familyMembers: string | undefined;
        let primaryContact: string | undefined;
        let organizationType: string | undefined;
        let taxId: string | undefined;
        let contactPerson: string | undefined;
        let contactTitle: string | undefined;

        if (recipient.type === 'individual') {
            const r = recipient as any;
            birthday = r.birthday;
            relationship = r.relationship;
        } else if (recipient.type === 'family') {
            const r = recipient as any;
            familyMembers = JSON.stringify(r.familyMembers || []);
            primaryContact = r.primaryContact;
        } else if (recipient.type === 'organization') {
            const r = recipient as any;
            organizationType = r.organizationType;
            taxId = r.taxId;
            contactPerson = r.contactPerson;
            contactTitle = r.contactTitle;
        }

        try {
            await db.execute(
                `INSERT INTO recipients (
              id, type, name, email, phone, address_line1, address_line2, city, state, postal_code, country,
              birthday, relationship, family_members, primary_contact, organization_type, tax_id, contact_person, contact_title,
              budget_limit, interests, tags, avatar_path, is_active, notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id, type, name, email || null, phone || null, addressLine1 || null, addressLine2 || null, city || null, state || null, postalCode || null, country || 'USA',
                    birthday || null, relationship || null, familyMembers || null, primaryContact || null, organizationType || null, taxId || null, contactPerson || null, contactTitle || null,
                    budgetLimit || null, interests || null, JSON.stringify(tags || []), avatarPath || null, isActive ? 1 : 0, notes || null, now, now
                ]
            );
        } catch (error) {
            console.error('Failed to create recipient:', error);
            throw error;
        }

        return {
            ...recipient,
            id,
            createdAt: now,
            updatedAt: now,
        } as Recipient;
    }
};
