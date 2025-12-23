import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, Theme } from '../types';
import { getDatabase } from '../services/database';

interface SettingsState extends AppSettings {
    updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
    loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'system',
            currency: 'USD',
            dateFormat: 'MM/dd/yyyy',
            defaultReminderDays: 7,
            sidebarCollapsed: false,
            currentYear: new Date().getFullYear(),

            updateSetting: async (key, value) => {
                set({ [key]: value });

                try {
                    const db = await getDatabase();
                    // Convert value to string for storage
                    const strValue = String(value);

                    await db.execute(
                        'INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ($1, $2, datetime("now"))',
                        [key, strValue]
                    );
                } catch (error) {
                    console.error(`Failed to persist setting ${key}:`, error);
                }
            },

            loadSettings: async () => {
                try {
                    const db = await getDatabase();
                    const rows = await db.select<{ key: string; value: string }[]>('SELECT key, value FROM settings');

                    const settings: Partial<AppSettings> = {};

                    rows.forEach(row => {
                        if (row.key === 'theme') settings.theme = row.value as Theme;
                        if (row.key === 'currency') settings.currency = row.value;
                        if (row.key === 'date_format') settings.dateFormat = row.value;
                        if (row.key === 'default_reminder_days') settings.defaultReminderDays = parseInt(row.value);
                        if (row.key === 'sidebar_collapsed') settings.sidebarCollapsed = row.value === 'true';
                        if (row.key === 'current_year') settings.currentYear = parseInt(row.value);
                    });

                    // Only update if we found settings in DB, otherwise keep defaults (or persisted localStorage)
                    if (Object.keys(settings).length > 0) {
                        set(settings as any);
                    }
                } catch (error) {
                    console.error('Failed to load settings from DB:', error);
                }
            }
        }),
        {
            name: 'gifttracker-settings',
            partialize: (state) => ({
                theme: state.theme,
                currency: state.currency,
                dateFormat: state.dateFormat,
                defaultReminderDays: state.defaultReminderDays,
                sidebarCollapsed: state.sidebarCollapsed,
                currentYear: state.currentYear,
            }),
        }
    )
);
