import type { GiftStatus, RecipientType, ShippingCarrier } from '../types';

// ============================================
// GIFT CONSTANTS
// ============================================

export const GIFT_STATUSES: readonly GiftStatus[] = [
  'purchased',
  'wrapped',
  'shipped',
  'delivered',
] as const;

export const GIFT_STATUS_LABELS: Record<GiftStatus, string> = {
  purchased: 'Purchased',
  wrapped: 'Wrapped',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export const GIFT_STATUS_COLORS: Record<GiftStatus, string> = {
  purchased: '#3B82F6', // blue
  wrapped: '#F59E0B', // amber
  shipped: '#8B5CF6', // purple
  delivered: '#10B981', // green
};

// ============================================
// RECIPIENT CONSTANTS
// ============================================

export const RECIPIENT_TYPES: readonly RecipientType[] = [
  'individual',
  'family',
  'organization',
] as const;

export const RECIPIENT_TYPE_LABELS: Record<RecipientType, string> = {
  individual: 'Individual',
  family: 'Family',
  organization: 'Organization',
};

// ============================================
// SHIPPING CONSTANTS
// ============================================

export const SHIPPING_CARRIERS: readonly ShippingCarrier[] = [
  'usps',
  'ups',
  'fedex',
  'amazon',
  'dhl',
  'other',
] as const;

export const SHIPPING_CARRIER_LABELS: Record<ShippingCarrier, string> = {
  usps: 'USPS',
  ups: 'UPS',
  fedex: 'FedEx',
  amazon: 'Amazon',
  dhl: 'DHL',
  other: 'Other',
};

export const TRACKING_URL_TEMPLATES: Record<ShippingCarrier, string | null> = {
  usps: 'https://tools.usps.com/go/TrackConfirmAction?tLabels={trackingNumber}',
  ups: 'https://www.ups.com/track?tracknum={trackingNumber}',
  fedex: 'https://www.fedex.com/fedextrack/?trknbr={trackingNumber}',
  amazon: 'https://www.amazon.com/progress-tracker/package/ref=ppx_yo_dt_b_track_package?_encoding=UTF8&itemId=&orderId=&packageIndex=&shipmentId={trackingNumber}',
  dhl: 'https://www.dhl.com/en/express/tracking.html?AWB={trackingNumber}',
  other: null,
};

// ============================================
// PRIORITY CONSTANTS
// ============================================

export const PRIORITY_LEVELS = [1, 2, 3, 4, 5] as const;

export const PRIORITY_LABELS: Record<number, string> = {
  1: 'Very Low',
  2: 'Low',
  3: 'Medium',
  4: 'High',
  5: 'Very High',
};

// ============================================
// DATE & TIME CONSTANTS
// ============================================

export const DEFAULT_REMINDER_DAYS = 7;

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM D, YYYY',
  ISO: 'YYYY-MM-DD',
  DATETIME: 'MM/DD/YYYY HH:mm',
} as const;

// ============================================
// CURRENCY CONSTANTS
// ============================================

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
] as const;

export const DEFAULT_CURRENCY = 'USD';

// ============================================
// VALIDATION CONSTANTS
// ============================================

export const MAX_NAME_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_NOTES_LENGTH = 2000;
export const MAX_TAGS = 20;
export const MAX_TAG_LENGTH = 50;
export const MAX_FAMILY_MEMBERS = 50;

// ============================================
// TAX CONSTANTS
// ============================================

export const TAX_CATEGORIES = ['business', 'charity'] as const;

export const TAX_CATEGORY_LABELS = {
  business: 'Business Expense',
  charity: 'Charitable Donation',
} as const;

// ============================================
// ORGANIZATION TYPES
// ============================================

export const ORGANIZATION_TYPES = [
  'business',
  'charity',
  'school',
  'religious',
  'government',
  'nonprofit',
  'other',
] as const;

export const ORGANIZATION_TYPE_LABELS = {
  business: 'Business',
  charity: 'Charity/Non-Profit',
  school: 'School/Educational',
  religious: 'Religious Organization',
  government: 'Government',
  nonprofit: 'Non-Profit',
  other: 'Other',
} as const;

// ============================================
// PAGINATION CONSTANTS
// ============================================

export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULT_COUNTRY = 'USA';
export const DEFAULT_PRIORITY = 3;
export const DEFAULT_YEAR = new Date().getFullYear();

// ============================================
// UI CONSTANTS
// ============================================

export const SIDEBAR_WIDTH = 256; // 16rem
export const HEADER_HEIGHT = 64; // 4rem
export const DEBOUNCE_DELAY = 300; // ms for search inputs
