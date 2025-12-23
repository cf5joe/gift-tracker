/**
 * Formatting utilities for currency, dates, and other display values
 */

// ============================================
// CURRENCY FORMATTING
// ============================================

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'EUR') // '€1,234.56'
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback if currency code is invalid
    return `$${amount.toFixed(2)}`;
  }
}

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567.89) // '1,234,567.89'
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// ============================================
// DATE FORMATTING
// ============================================

/**
 * Format an ISO date string to a display format
 * @param date - ISO date string
 * @param format - Format option ('short', 'long', 'iso', 'datetime')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-12-25') // '12/25/2024'
 * formatDate('2024-12-25', 'long') // 'December 25, 2024'
 */
export function formatDate(date: string, format: string = 'short'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return date; // Return original if invalid
  }

  switch (format.toLowerCase()) {
    case 'short':
      return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(d);

    case 'long':
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(d);

    case 'iso':
      return d.toISOString().split('T')[0];

    case 'datetime':
      return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);

    default:
      return d.toLocaleDateString('en-US');
  }
}

/**
 * Format a date as a relative time string
 * @param date - ISO date string
 * @returns Relative time string
 *
 * @example
 * formatRelativeDate('2024-12-25') // '3 days ago' or 'in 3 days'
 */
export function formatRelativeDate(date: string): string {
  const d = new Date(date);
  const now = new Date();

  if (isNaN(d.getTime())) {
    return date;
  }

  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.round(diffMs / (1000 * 60));

  // Past dates
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    if (absDays === 0) {
      if (Math.abs(diffHours) === 0) {
        if (Math.abs(diffMinutes) === 0) {
          return 'just now';
        }
        return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) !== 1 ? 's' : ''} ago`;
      }
      return `${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''} ago`;
    }
    if (absDays === 1) return 'yesterday';
    if (absDays < 7) return `${absDays} days ago`;
    if (absDays < 30) {
      const weeks = Math.floor(absDays / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    }
    if (absDays < 365) {
      const months = Math.floor(absDays / 30);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(absDays / 365);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }

  // Future dates
  if (diffDays === 0) {
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return 'just now';
      }
      return `in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    }
    return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  }
  if (diffDays === 1) return 'tomorrow';
  if (diffDays < 7) return `in ${diffDays} days`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `in ${weeks} week${weeks !== 1 ? 's' : ''}`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `in ${months} month${months !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(diffDays / 365);
  return `in ${years} year${years !== 1 ? 's' : ''}`;
}

/**
 * Calculate days until a date
 * @param date - ISO date string
 * @returns Number of days (negative if past)
 */
export function daysUntil(date: string): number {
  const d = new Date(date);
  const now = new Date();

  if (isNaN(d.getTime())) {
    return 0;
  }

  const diffMs = d.getTime() - now.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

// ============================================
// TEXT FORMATTING
// ============================================

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to append if truncated (default: '...')
 * @returns Truncated text
 *
 * @example
 * truncate('Hello World', 8) // 'Hello...'
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Pluralize a word based on count
 * @param count - The count
 * @param singular - Singular form
 * @param plural - Plural form (optional, defaults to singular + 's')
 * @returns Pluralized string
 *
 * @example
 * pluralize(1, 'gift') // '1 gift'
 * pluralize(5, 'gift') // '5 gifts'
 * pluralize(2, 'person', 'people') // '2 people'
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || singular + 's');
  return `${count} ${word}`;
}

/**
 * Capitalize the first letter of a string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert a string to title case
 * @param text - Text to convert
 * @returns Title case text
 *
 * @example
 * titleCase('hello world') // 'Hello World'
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

// ============================================
// PERCENTAGE FORMATTING
// ============================================

/**
 * Format a decimal as a percentage
 * @param value - Decimal value (0-1)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercent(0.75) // '75%'
 * formatPercent(0.7567, 2) // '75.67%'
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Calculate percentage
 * @param value - The value
 * @param total - The total
 * @returns Percentage (0-100)
 */
export function calculatePercent(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

// ============================================
// ADDRESS FORMATTING
// ============================================

/**
 * Format an address from components
 * @param components - Address components
 * @returns Formatted address string
 */
export function formatAddress(components: {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}): string {
  const parts: string[] = [];

  if (components.addressLine1) parts.push(components.addressLine1);
  if (components.addressLine2) parts.push(components.addressLine2);

  const cityStateZip: string[] = [];
  if (components.city) cityStateZip.push(components.city);
  if (components.state) cityStateZip.push(components.state);
  if (components.postalCode) cityStateZip.push(components.postalCode);

  if (cityStateZip.length > 0) {
    parts.push(cityStateZip.join(', '));
  }

  if (components.country && components.country !== 'USA') {
    parts.push(components.country);
  }

  return parts.join('\n');
}

// ============================================
// PHONE FORMATTING
// ============================================

/**
 * Format a phone number (US format)
 * @param phone - Phone number string
 * @returns Formatted phone number
 *
 * @example
 * formatPhone('1234567890') // '(123) 456-7890'
 */
export function formatPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Return original if can't format
  return phone;
}
