import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSettingsStore } from '../../stores/settingsStore';
import {
  LayoutDashboard,
  Users,
  Gift,
  Lightbulb,
  BarChart3,
  Settings,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export default function Sidebar() {
  const { sidebarCollapsed, updateSetting } = useSettingsStore();

  const toggleSidebar = () => {
    updateSetting('sidebarCollapsed', !sidebarCollapsed);
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recipients', icon: Users, label: 'Recipients' },
    { to: '/gifts', icon: Gift, label: 'Gifts' },
    { to: '/ideas', icon: Lightbulb, label: 'Ideas' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300 flex flex-col",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!sidebarCollapsed && (
          <span className="font-bold text-xl text-primary truncate">GiftTracker</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("ml-auto", sidebarCollapsed ? "w-full" : "")}
        >
          {sidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
              sidebarCollapsed ? "justify-center" : ""
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t text-xs text-center text-muted-foreground">
        {!sidebarCollapsed && <p>v1.0.0</p>}
      </div>
    </aside>
  );
}
