import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecipients } from '../hooks/useRecipients';
import { useGifts } from '../hooks/useGifts';
import { useIdeas } from '../hooks/useIdeas';
import { formatCurrency } from '@/utils/formatters';
import { Users, Gift, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { getDatabase } from '../services/database';

export default function Dashboard() {
    const { recipients } = useRecipients();
    const { gifts } = useGifts();
    const { ideas } = useIdeas();
    const [totalBudget, setTotalBudget] = useState(0); // This would come from budget table in future

    // Calculate dynamic stats
    const totalSpent = gifts.reduce((acc, g) => acc + (g.purchasePrice || 0), 0);
    const giftsPurchased = gifts.length;
    const giftsToBuy = ideas.length;

    // Quick calculations
    const upcomingEvents = [
        { name: "Christmas", date: "Dec 25", days: 2 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                        <p className="text-xs text-muted-foreground">
                            For {new Date().getFullYear()} season
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recipients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{recipients.length}</div>
                        <p className="text-xs text-muted-foreground">
                            active people
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gifts Purchased</CardTitle>
                        <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{giftsPurchased}</div>
                        <p className="text-xs text-muted-foreground">
                            items bought
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ideas</CardTitle>
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ideas.length}</div>
                        <p className="text-xs text-muted-foreground">
                            potential gifts
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Recent gifts added or updated will appear here.</p>
                        {/* Placeholder lists */}
                        <div className="space-y-4 mt-4">
                            {gifts.slice(0, 5).map(gift => (
                                <div key={gift.id} className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                                    <span className="text-sm font-medium">{gift.name}</span>
                                    <span className="ml-auto text-sm text-gray-500">{formatCurrency(gift.purchasePrice)}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Occasions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium">{event.name}</p>
                                        <p className="text-xs text-muted-foreground">{event.date}</p>
                                    </div>
                                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                                        {event.days} days left
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
