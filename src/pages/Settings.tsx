import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettingsStore } from '../stores/settingsStore';
import { useTheme } from '../hooks/useTheme';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    // In a real implementation we would bind these to the DB settings table via settingsStore

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your application preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={theme} onValueChange={(t: any) => setTheme(t)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export or reset your data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive text-sm">
                            <h4 className="font-bold mb-1">Danger Zone</h4>
                            <p>Resetting the database will permanently delete all recipients and gifts.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
