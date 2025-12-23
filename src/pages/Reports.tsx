import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGifts } from '../hooks/useGifts';
import { useRecipients } from '../hooks/useRecipients';
import { formatCurrency } from '@/utils/formatters';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Loader2 } from 'lucide-react';

export default function Reports() {
    const { gifts, isLoading: giftsLoading } = useGifts();
    const { recipients, isLoading: recipientsLoading } = useRecipients();

    const isLoading = giftsLoading || recipientsLoading;

    // Data Preparation
    const spendingByRecipient = React.useMemo(() => {
        const data = recipients.map(r => {
            const recipientGifts = gifts.filter(g => g.recipientId === r.id);
            const total = recipientGifts.reduce((sum, g) => sum + (g.purchasePrice || 0), 0);
            return {
                name: r.name,
                value: total
            };
        }).filter(d => d.value > 0).sort((a, b) => b.value - a.value);
        return data;
    }, [recipients, gifts]);

    const giftStatusData = React.useMemo(() => {
        const counts: Record<string, number> = {};
        gifts.forEach(g => {
            const status = g.status || 'purchased';
            counts[status] = (counts[status] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [gifts]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Spending by Recipient</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {spendingByRecipient.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={spendingByRecipient}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                    <Legend />
                                    <Bar dataKey="value" name="Amount Spent" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No spending data available
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Gift Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {giftStatusData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={giftStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name?: string; percent?: number }) => `${name || 'Unknown'} ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {giftStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No gift data available
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
