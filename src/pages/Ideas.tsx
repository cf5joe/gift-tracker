import React from 'react';
import { useIdeas } from '../hooks/useIdeas';
import { useRecipients } from '../hooks/useRecipients';
import { AddIdeaDialog } from '../components/ideas/AddIdeaDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb, ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function Ideas() {
    const { ideas, isLoading: ideasLoading } = useIdeas();
    const { recipients, isLoading: recipientsLoading } = useRecipients();

    // Create a lookup for recipient names
    const recipientMap = React.useMemo(() => {
        const map = new Map<string, string>();
        recipients.forEach(r => map.set(r.id, r.name));
        return map;
    }, [recipients]);

    const isLoading = ideasLoading || recipientsLoading;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Ideas</h2>
                <AddIdeaDialog />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : ideas.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold">No ideas yet</h3>
                    <p className="text-muted-foreground">Capture your gift ideas here.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ideas.map((idea) => (
                        <Card key={idea.id} className="hover:bg-accent/5 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {idea.name}
                                </CardTitle>
                                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {idea.estimatedPrice && (
                                    <div className="text-2xl font-bold">{formatCurrency(idea.estimatedPrice)}</div>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    For: <span className="font-medium text-foreground">{idea.recipientId ? (recipientMap.get(idea.recipientId) || 'Unknown') : 'General'}</span>
                                </p>
                                {idea.sourceUrl && (
                                    <a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center mt-2 text-xs text-blue-500 hover:underline">
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        View Source
                                    </a>
                                )}
                                <div className="mt-2 flex gap-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                        Priority: {idea.priority}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
