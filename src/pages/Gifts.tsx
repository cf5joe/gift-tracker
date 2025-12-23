import React from 'react';
import { useGifts } from '../hooks/useGifts';
import { useRecipients } from '../hooks/useRecipients';
import { AddGiftDialog } from '../components/gifts/AddGiftDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Gift as GiftIcon, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function Gifts() {
    const { gifts, isLoading: giftsLoading } = useGifts();
    const { recipients, isLoading: recipientsLoading } = useRecipients();

    // Create a lookup for recipient names
    const recipientMap = React.useMemo(() => {
        const map = new Map<string, string>();
        recipients.forEach(r => map.set(r.id, r.name));
        return map;
    }, [recipients]);

    const isLoading = giftsLoading || recipientsLoading;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Gifts</h2>
                <AddGiftDialog />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : gifts.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold">No gifts recorded yet</h3>
                    <p className="text-muted-foreground">Add your first gift purchase to start tracking.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {gifts.map((gift) => (
                        <Card key={gift.id} className="hover:bg-accent/5 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {gift.name}
                                </CardTitle>
                                <GiftIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(gift.purchasePrice)}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    For: <span className="font-medium text-foreground">{recipientMap.get(gift.recipientId) || 'Unknown'}</span>
                                </p>
                                <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                    {gift.status}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
