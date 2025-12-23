// ============================================
// ENUMS & CONSTANTS
// ============================================

export type RecipientType = 'individual' | 'family' | 'organization';

export type GiftStatus = 'purchased' | 'wrapped' | 'shipped' | 'delivered';

export type Theme = 'light' | 'dark' | 'system';

export type ShippingCarrier =
    | 'usps'
    | 'ups'
    | 'fedex'
    | 'amazon'
    | 'dhl'
    | 'other';

export type TaxCategory = 'business' | 'charity';

// ============================================
// LOOKUP TYPES
// ============================================

export interface Occasion {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    isRecurring: boolean;
    defaultMonth?: number;
    sortOrder: number;
}

export interface Category {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    sortOrder: number;
}

// ============================================
// RECIPIENT TYPES
// ============================================

export interface RecipientBase {
    id: string;
    type: RecipientType;
    name: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country: string;
    budgetLimit?: number;
    interests?: string;
    tags: string[];
    avatarPath?: string;
    isActive: boolean;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IndividualRecipient extends RecipientBase {
    type: 'individual';
    birthday?: string;
    relationship?: string;
}

export interface FamilyRecipient extends RecipientBase {
    type: 'family';
    familyMembers: string[];
    primaryContact?: string;
}

export interface OrganizationRecipient extends RecipientBase {
    type: 'organization';
    organizationType?: string;
    taxId?: string;
    contactPerson?: string;
    contactTitle?: string;
}

export type Recipient =
    | IndividualRecipient
    | FamilyRecipient
    | OrganizationRecipient;

// ============================================
// GIFT TYPES
// ============================================

export interface GiftContributor {
    id: string;
    giftId: string;
    contributorName: string;
    contributionAmount: number;
    isCurrentUser: boolean;
    hasPaid: boolean;
    notes?: string;
}

export interface Gift {
    id: string;
    recipientId: string;
    occasionId?: string;
    categoryId?: string;

    // Core info
    name: string;
    description?: string;
    year: number;

    // Purchase details
    purchasePrice: number;
    purchaseLocation?: string;
    purchaseDate?: string;
    purchaseUrl?: string;

    // Lifecycle
    status: GiftStatus;
    wrappedDate?: string;
    shippedDate?: string;
    deliveredDate?: string;
    thankYouReceived: boolean;
    thankYouDate?: string;

    // Shipping
    carrier?: ShippingCarrier;
    trackingNumber?: string;
    expectedDelivery?: string;

    // Tax
    isTaxDeductible: boolean;
    taxCategory?: TaxCategory;

    // Split gift
    isSplitGift: boolean;
    totalGiftCost?: number;
    userContribution?: number;
    contributors?: GiftContributor[];

    // Receipt
    receiptImagePath?: string;
    receiptText?: string;

    notes?: string;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// IDEA TYPE
// ============================================

export interface Idea {
    id: string;
    recipientId?: string;
    categoryId?: string;

    name: string;
    description?: string;
    estimatedPrice?: number;
    sourceUrl?: string;
    priority: 1 | 2 | 3 | 4 | 5;

    convertedToGiftId?: string;
    convertedAt?: string;

    notes?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

// ============================================
// BUDGET & DEADLINE TYPES
// ============================================

export interface Budget {
    id: string;
    year: number;
    recipientId?: string;
    occasionId?: string;
    amount: number;
}

export interface Deadline {
    id: string;
    year: number;
    recipientId?: string;
    occasionId?: string;
    targetDate: string;
    reminderDays: number;
    isNotified: boolean;
}

// ============================================
// SETTINGS TYPE
// ============================================

export interface AppSettings {
    theme: Theme;
    currency: string;
    dateFormat: string;
    defaultReminderDays: number;
    sidebarCollapsed: boolean;
    currentYear: number;
}

// ============================================
// COMPUTED/VIEW TYPES
// ============================================

export type RecipientWithStats = Recipient & {
    totalGifts: number;
    giftsDelivered: number;
    totalSpent: number;
    budgetRemaining?: number;
    completionPercent: number;
};

export interface GiftWithRelations extends Gift {
    recipient?: Recipient;
    occasion?: Occasion;
    category?: Category;
}

export interface IdeaWithRelations extends Idea {
    recipient?: Recipient;
    category?: Category;
}

export interface DashboardStats {
    totalRecipients: number;
    totalGifts: number;
    totalSpent: number;
    budgetTotal: number;
    budgetRemaining: number;
    budgetPercent: number;
    recipientsComplete: number;
    daysUntilDeadline: number;
    taxDeductibleTotal: number;
}

export interface DeadlineAlert {
    deadline: Deadline;
    recipientName?: string;
    occasionName?: string;
    daysRemaining: number;
    isOverdue: boolean;
}

// ============================================
// FORM INPUT TYPES
// ============================================

export interface RecipientFormData {
    type: RecipientType;
    name: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    budgetLimit?: number;
    interests?: string;
    tags?: string[];
    isActive?: boolean;
    notes?: string;
    // Type-specific
    birthday?: string;
    relationship?: string;
    familyMembers?: string[];
    primaryContact?: string;
    organizationType?: string;
    taxId?: string;
    contactPerson?: string;
    contactTitle?: string;
}

export interface GiftFormData {
    recipientId: string;
    occasionId?: string;
    categoryId?: string;
    name: string;
    description?: string;
    year: number;
    purchasePrice: number;
    purchaseLocation?: string;
    purchaseDate?: string;
    purchaseUrl?: string;
    isTaxDeductible?: boolean;
    taxCategory?: TaxCategory;
    isSplitGift?: boolean;
    totalGiftCost?: number;
    userContribution?: number;
    notes?: string;
}

export interface IdeaFormData {
    recipientId?: string;
    categoryId?: string;
    name: string;
    description?: string;
    estimatedPrice?: number;
    sourceUrl?: string;
    priority?: 1 | 2 | 3 | 4 | 5;
    notes?: string;
    tags?: string[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    // loading?: boolean; // Removed to avoid conflict with store loading states? Spec didn't have it but common. Sticking to spec.
}

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ============================================
// FILTER/SORT TYPES
// ============================================

export interface GiftFilters {
    year?: number;
    recipientId?: string;
    occasionId?: string;
    categoryId?: string;
    status?: GiftStatus;
    isTaxDeductible?: boolean;
    searchQuery?: string;
}

export interface RecipientFilters {
    type?: RecipientType;
    isActive?: boolean;
    searchQuery?: string;
    tags?: string[];
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: string;
    direction: SortDirection;
}
