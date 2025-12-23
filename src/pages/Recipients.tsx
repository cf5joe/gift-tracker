import React from 'react';
import { useRecipients } from '../hooks/useRecipients';
import { AddRecipientDialog } from '../components/recipients/AddRecipientDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Users, Building2 } from 'lucide-react';

export default function Recipients() {
    const { recipients, isLoading } = useRecipients();

    const getIcon = (type: string) => {
        switch (type) {
            case 'family': return <Users className="h-5 w-5 text-purple-500" />;
            case 'organization': return <Building2 className="h-5 w-5 text-blue-500" />;
            default: return <User className="h-5 w-5 text-green-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Recipients</h2>
                <AddRecipientDialog />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : recipients.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold">No recipients yet</h3>
                    <p className="text-muted-foreground">Add your first recipient to start tracking gifts.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recipients.map((recipient) => (
                        <Card key={recipient.id} className="hover:bg-accent/5 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {recipient.name}
                                </CardTitle>
                                {getIcon(recipient.type)}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {'relationship' in recipient ? recipient.relationship : recipient.type}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {recipient.email || "No email"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
