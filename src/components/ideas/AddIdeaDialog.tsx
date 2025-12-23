import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useIdeas } from '../../hooks/useIdeas';
import { useRecipients } from '../../hooks/useRecipients';
import { Idea } from '../../types';
import { Loader2, Plus } from 'lucide-react';

export function AddIdeaDialog() {
    const [open, setOpen] = useState(false);
    const { createIdea, isCreating } = useIdeas();
    const { recipients } = useRecipients();

    const [formData, setFormData] = useState<Partial<Idea>>({
        priority: 3,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        try {
            await createIdea(formData as any);
            setOpen(false);
            setFormData({
                priority: 3,
            });
        } catch (error: any) {
            console.error("Failed to create idea", error);
            alert(`Failed to create idea: ${error.message || error}`);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Idea
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Gift Idea</DialogTitle>
                        <DialogDescription>
                            Save an idea for later.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="recipient" className="text-right">
                                Recipient
                            </Label>
                            <Select
                                value={formData.recipientId || ''}
                                onValueChange={(val) => handleChange('recipientId', val)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select (Optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None (General Idea)</SelectItem>
                                    {recipients.map(r => (
                                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Idea
                            </Label>
                            <Input
                                id="name"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Est. Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.estimatedPrice || ''}
                                onChange={(e) => handleChange('estimatedPrice', parseFloat(e.target.value))}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">
                                URL
                            </Label>
                            <Input
                                id="url"
                                type="url"
                                value={formData.sourceUrl || ''}
                                onChange={(e) => handleChange('sourceUrl', e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                                Priority
                            </Label>
                            <Select
                                value={formData.priority?.toString()}
                                onValueChange={(val) => handleChange('priority', parseInt(val))}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 - Low</SelectItem>
                                    <SelectItem value="2">2 - Medium-Low</SelectItem>
                                    <SelectItem value="3">3 - Medium</SelectItem>
                                    <SelectItem value="4">4 - High</SelectItem>
                                    <SelectItem value="5">5 - Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Idea
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
