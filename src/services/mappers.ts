import type { Recipient, Gift, Idea } from '../types';

// Convert snake_case DB rows to camelCase TypeScript objects

export function mapRecipientRow(row: Record<string, any>): Recipient {
    const base = {
        id: row.id,
        type: row.type,
        name: row.name,
        email: row.email || undefined,
        phone: row.phone || undefined,
        addressLine1: row.address_line1 || undefined,
        addressLine2: row.address_line2 || undefined,
        city: row.city || undefined,
        state: row.state || undefined,
        postalCode: row.postal_code || undefined,
        country: row.country || 'USA',
        budgetLimit: row.budget_limit || undefined,
        interests: row.interests || undefined,
        tags: row.tags ? JSON.parse(row.tags) : [],
        avatarPath: row.avatar_path || undefined,
        isActive: Boolean(row.is_active),
        notes: row.notes || undefined,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };

    switch (row.type) {
        case 'individual':
            return {
                ...base,
                type: 'individual',
                birthday: row.birthday || undefined,
                relationship: row.relationship || undefined,
            };
        case 'family':
            return {
                ...base,
                type: 'family',
                familyMembers: row.family_members ? JSON.parse(row.family_members) : [],
                primaryContact: row.primary_contact || undefined,
            };
        case 'organization':
            return {
                ...base,
                type: 'organization',
                organizationType: row.organization_type || undefined,
                taxId: row.tax_id || undefined,
                contactPerson: row.contact_person || undefined,
                contactTitle: row.contact_title || undefined,
            };
        default:
            return base as Recipient;
    }
}

export function mapGiftRow(row: Record<string, any>): Gift {
    return {
        id: row.id,
        recipientId: row.recipient_id,
        occasionId: row.occasion_id || undefined,
        categoryId: row.category_id || undefined,
        name: row.name,
        description: row.description || undefined,
        year: row.year,
        purchasePrice: row.purchase_price,
        purchaseLocation: row.purchase_location || undefined,
        purchaseDate: row.purchase_date || undefined,
        purchaseUrl: row.purchase_url || undefined,
        status: row.status,
        wrappedDate: row.wrapped_date || undefined,
        shippedDate: row.shipped_date || undefined,
        deliveredDate: row.delivered_date || undefined,
        thankYouReceived: Boolean(row.thank_you_received),
        thankYouDate: row.thank_you_date || undefined,
        carrier: row.carrier || undefined,
        trackingNumber: row.tracking_number || undefined,
        expectedDelivery: row.expected_delivery || undefined,
        isTaxDeductible: Boolean(row.is_tax_deductible),
        taxCategory: row.tax_category || undefined,
        isSplitGift: Boolean(row.is_split_gift),
        totalGiftCost: row.total_gift_cost || undefined,
        userContribution: row.user_contribution || undefined,
        receiptImagePath: row.receipt_image_path || undefined,
        receiptText: row.receipt_text || undefined,
        notes: row.notes || undefined,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export function mapIdeaRow(row: Record<string, any>): Idea {
    return {
        id: row.id,
        recipientId: row.recipient_id || undefined,
        categoryId: row.category_id || undefined,
        name: row.name,
        description: row.description || undefined,
        estimatedPrice: row.estimated_price || undefined,
        sourceUrl: row.source_url || undefined,
        priority: row.priority || 3,
        convertedToGiftId: row.converted_to_gift_id || undefined,
        convertedAt: row.converted_at || undefined,
        notes: row.notes || undefined,
        tags: row.tags ? JSON.parse(row.tags) : [],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
