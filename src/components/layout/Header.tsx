import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSettingsStore } from '../../stores/settingsStore';
import { useTheme } from '../../hooks/useTheme';
import { Bell, Moon, Sun, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

export default function Header() {
  const location = useLocation();
  const { currentYear, updateSetting } = useSettingsStore();
  const { theme, setTheme } = useTheme();

  // Determine title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/recipients')) return 'Recipients';
    if (path.startsWith('/gifts')) return 'Gifts';
    if (path.startsWith('/ideas')) return 'Ideas';
    if (path.startsWith('/reports')) return 'Reports';
    if (path.startsWith('/settings')) return 'Settings';
    return 'GiftTracker';
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 + i);

  return (
    <header className="h-16 px-6 bg-card border-b flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-xl font-semibold">{getPageTitle()}</h1>

      <div className="flex items-center gap-4">
        {/* Year Selector */}
        <select
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={currentYear}
          onChange={(e) => updateSetting('currentYear', parseInt(e.target.value))}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications Placeholder */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Settings Link Placeholder (Icon) */}
          {/* <Button variant="ghost" size="icon">
            <SettingsIcon className="h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </header>
  );
}
