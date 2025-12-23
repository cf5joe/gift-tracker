import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useTheme } from '../../hooks/useTheme';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from '../ui/toaster'; // Assuming toaster component path
// Note: Toaster might need to be added if not present. shadcn 'toast' adds Toaster usually.

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarCollapsed } = useSettingsStore();
  const { theme } = useTheme(); // Initialize theme effect

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
      >
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
