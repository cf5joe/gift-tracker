import { getDatabase } from './database';
import { mapGiftRow } from './mappers';
import { Gift } from '../types';
import { generateId } from '../utils/idGenerator';

export const giftService = {
    async getAll(): Promise<Gift[]> {
        const db = await getDatabase();
        // Join with recipients to get recipient name? ideally yes, but for now just fetch gifts.
        // We can fetch recipients separately and join in UI or simple join here.
        // For now, simple fetch.
        const rows = await db.select<Record<string, any>[]>('SELECT * FROM gifts WHERE deleted_at IS NULL ORDER BY created_at DESC');
        return rows.map(mapGiftRow);
    },

    async create(gift: Omit<Gift, 'id' | 'createdAt' | 'updatedAt'>): Promise<Gift> {
        const db = await getDatabase();
        const id = generateId('gift');
        const now = new Date().toISOString();

        const {
            recipientId, occasionId, categoryId, name, description, year, purchasePrice,
            purchaseLocation, purchaseDate, purchaseUrl, status, wrappedDate, shippedDate,
            deliveredDate, thankYouReceived, thankYouDate, carrier, trackingNumber,
            expectedDelivery, isTaxDeductible, taxCategory, isSplitGift, totalGiftCost,
            userContribution, receiptImagePath, receiptText, notes
        } = gift;

        await db.execute(
            `INSERT INTO gifts (
            id, recipient_id, occasion_id, category_id, name, description, year, purchase_price,
            purchase_location, purchase_date, purchase_url, status, wrapped_date, shipped_date,
            delivered_date, thank_you_received, thank_you_date, carrier, tracking_number,
            expected_delivery, is_tax_deductible, tax_category, is_split_gift, total_gift_cost,
            user_contribution, receipt_image_path, receipt_text, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id, recipientId, occasionId || null, categoryId || null, name, description || null, year, purchasePrice,
                purchaseLocation || null, purchaseDate || null, purchaseUrl || null, status || 'purchased', wrappedDate || null, shippedDate || null,
                deliveredDate || null, thankYouReceived ? 1 : 0, thankYouDate || null, carrier || null, trackingNumber || null,
                expectedDelivery || null, isTaxDeductible ? 1 : 0, taxCategory || null, isSplitGift ? 1 : 0, totalGiftCost || null,
                userContribution || null, receiptImagePath || null, receiptText || null, notes || null, now, now
            ]
        );

        return {
            ...gift,
            id,
            createdAt: now,
            updatedAt: now,
        };
    }
};
