import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
    if (!db) {
        db = await Database.load('sqlite:gifttracker.db');
        await initializeDatabase(db);
    }
    return db;
}

async function initializeDatabase(db: Database) {
    // Enable foreign keys
    await db.execute('PRAGMA foreign_keys = ON;');

    // Create tables
    await db.execute(`
    CREATE TABLE IF NOT EXISTS occasions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      icon TEXT,
      color TEXT,
      is_recurring INTEGER DEFAULT 0,
      default_month INTEGER,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      icon TEXT,
      color TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS recipients (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('individual', 'family', 'organization')),
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address_line1 TEXT,
      address_line2 TEXT,
      city TEXT,
      state TEXT,
      postal_code TEXT,
      country TEXT DEFAULT 'USA',
      birthday TEXT,
      relationship TEXT,
      family_members TEXT,
      primary_contact TEXT,
      organization_type TEXT,
      tax_id TEXT,
      contact_person TEXT,
      contact_title TEXT,
      budget_limit REAL,
      interests TEXT,
      tags TEXT,
      avatar_path TEXT,
      is_active INTEGER DEFAULT 1,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS gifts (
      id TEXT PRIMARY KEY,
      recipient_id TEXT NOT NULL,
      occasion_id TEXT,
      category_id TEXT,
      name TEXT NOT NULL,
      description TEXT,
      year INTEGER NOT NULL,
      purchase_price REAL NOT NULL,
      purchase_location TEXT,
      purchase_date TEXT,
      purchase_url TEXT,
      status TEXT DEFAULT 'purchased' CHECK (status IN ('purchased', 'wrapped', 'shipped', 'delivered')),
      wrapped_date TEXT,
      shipped_date TEXT,
      delivered_date TEXT,
      thank_you_received INTEGER DEFAULT 0,
      thank_you_date TEXT,
      carrier TEXT,
      tracking_number TEXT,
      expected_delivery TEXT,
      is_tax_deductible INTEGER DEFAULT 0,
      tax_category TEXT,
      is_split_gift INTEGER DEFAULT 0,
      total_gift_cost REAL,
      user_contribution REAL,
      receipt_image_path TEXT,
      receipt_text TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT,
      FOREIGN KEY (recipient_id) REFERENCES recipients(id),
      FOREIGN KEY (occasion_id) REFERENCES occasions(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS gift_contributors (
      id TEXT PRIMARY KEY,
      gift_id TEXT NOT NULL,
      contributor_name TEXT NOT NULL,
      contribution_amount REAL NOT NULL,
      is_current_user INTEGER DEFAULT 0,
      has_paid INTEGER DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (gift_id) REFERENCES gifts(id) ON DELETE CASCADE
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS ideas (
      id TEXT PRIMARY KEY,
      recipient_id TEXT,
      category_id TEXT,
      name TEXT NOT NULL,
      description TEXT,
      estimated_price REAL,
      source_url TEXT,
      priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
      converted_to_gift_id TEXT,
      converted_at TEXT,
      notes TEXT,
      tags TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT,
      FOREIGN KEY (recipient_id) REFERENCES recipients(id),
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (converted_to_gift_id) REFERENCES gifts(id)
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS budgets (
      id TEXT PRIMARY KEY,
      year INTEGER NOT NULL,
      recipient_id TEXT,
      occasion_id TEXT,
      amount REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (recipient_id) REFERENCES recipients(id),
      FOREIGN KEY (occasion_id) REFERENCES occasions(id),
      UNIQUE(year, recipient_id, occasion_id)
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS deadlines (
      id TEXT PRIMARY KEY,
      year INTEGER NOT NULL,
      recipient_id TEXT,
      occasion_id TEXT,
      target_date TEXT NOT NULL,
      reminder_days INTEGER DEFAULT 7,
      is_notified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (recipient_id) REFERENCES recipients(id),
      FOREIGN KEY (occasion_id) REFERENCES occasions(id)
    );
  `);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

    // Create indexes
    await db.execute('CREATE INDEX IF NOT EXISTS idx_recipients_type ON recipients(type);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_recipients_active ON recipients(is_active);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_recipients_name ON recipients(name);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_gifts_recipient ON gifts(recipient_id);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_gifts_year ON gifts(year);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_gifts_occasion ON gifts(occasion_id);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_gifts_status ON gifts(status);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_contributors_gift ON gift_contributors(gift_id);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_ideas_recipient ON ideas(recipient_id);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_budgets_year ON budgets(year);');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_deadlines_year ON deadlines(year);');

    // Insert default data for occasions (ignoring conflicts)
    await db.execute(`
    INSERT OR IGNORE INTO occasions (id, name, icon, color, is_recurring, default_month, sort_order) VALUES
    ('occ_christmas', 'Christmas', 'gift', '#DC2626', 1, 12, 1),
    ('occ_hanukkah', 'Hanukkah', 'flame', '#2563EB', 1, 12, 2),
    ('occ_birthday', 'Birthday', 'cake', '#F59E0B', 1, NULL, 3),
    ('occ_anniversary', 'Anniversary', 'heart', '#EC4899', 1, NULL, 4),
    ('occ_valentines', 'Valentine''s Day', 'heart', '#EC4899', 1, 2, 5),
    ('occ_mothers_day', 'Mother''s Day', 'flower', '#EC4899', 1, 5, 6),
    ('occ_fathers_day', 'Father''s Day', 'user', '#3B82F6', 1, 6, 7),
    ('occ_wedding', 'Wedding', 'gem', '#8B5CF6', 0, NULL, 8),
    ('occ_baby_shower', 'Baby Shower', 'baby', '#F472B6', 0, NULL, 9),
    ('occ_graduation', 'Graduation', 'graduation-cap', '#10B981', 0, NULL, 10),
    ('occ_corporate', 'Corporate/Business', 'briefcase', '#6B7280', 0, NULL, 11),
    ('occ_thank_you', 'Thank You', 'message-circle', '#14B8A6', 0, NULL, 12),
    ('occ_other', 'Other', 'package', '#6B7280', 0, NULL, 99);
  `);

    // Insert default categories
    await db.execute(`
    INSERT OR IGNORE INTO categories (id, name, icon, color, sort_order) VALUES
    ('cat_electronics', 'Electronics', 'smartphone', '#3B82F6', 1),
    ('cat_clothing', 'Clothing & Accessories', 'shirt', '#EC4899', 2),
    ('cat_home', 'Home & Garden', 'home', '#10B981', 3),
    ('cat_toys', 'Toys & Games', 'gamepad-2', '#F59E0B', 4),
    ('cat_books', 'Books & Media', 'book-open', '#8B5CF6', 5),
    ('cat_food', 'Food & Beverages', 'utensils', '#EF4444', 6),
    ('cat_experiences', 'Experiences', 'ticket', '#06B6D4', 7),
    ('cat_gift_cards', 'Gift Cards', 'credit-card', '#6366F1', 8),
    ('cat_jewelry', 'Jewelry & Watches', 'gem', '#F472B6', 9),
    ('cat_sports', 'Sports & Outdoors', 'bike', '#22C55E', 10),
    ('cat_beauty', 'Beauty & Personal Care', 'sparkles', '#D946EF', 11),
    ('cat_handmade', 'Handmade/DIY', 'scissors', '#F97316', 12),
    ('cat_charity', 'Charitable Donation', 'heart-handshake', '#EF4444', 13),
    ('cat_other', 'Other', 'package', '#6B7280', 99);
  `);

    // Insert default settings
    await db.execute(`
    INSERT OR IGNORE INTO settings (key, value) VALUES
    ('theme', 'system'),
    ('currency', 'USD'),
    ('date_format', 'MM/DD/YYYY'),
    ('default_reminder_days', '7'),
    ('sidebar_collapsed', 'false'),
    ('current_year', strftime('%Y', 'now'));
  `);
}
