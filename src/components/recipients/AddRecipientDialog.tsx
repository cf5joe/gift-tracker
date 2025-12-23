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
import { useRecipients } from '../../hooks/useRecipients';
import { Recipient } from '../../types';
import { Loader2, Plus } from 'lucide-react';

export function AddRecipientDialog() {
    const [open, setOpen] = useState(false);
    const { createRecipient, isCreating } = useRecipients();
    const [formData, setFormData] = useState<Partial<Recipient>>({
        type: 'individual',
        country: 'USA',
        isActive: true,
        tags: [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.type) return;

        try {
            await createRecipient(formData as any);
            setOpen(false);
            setFormData({
                type: 'individual',
                country: 'USA',
                isActive: true,
                tags: [],
            });
        } catch (error: any) {
            console.error("Failed to create recipient", error);
            alert(`Failed to create recipient: ${error.message || error}`);
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
                    Add Recipient
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Recipient</DialogTitle>
                        <DialogDescription>
                            Add a new person to your gift list.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select
                                value={formData.type}
                                onValueChange={(val) => handleChange('type', val)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="family">Family</SelectItem>
                                    <SelectItem value="organization">Organization</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
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
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        {formData.type === 'individual' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="relationship" className="text-right">
                                    Relation
                                </Label>
                                <Select
                                    value={formData.relationship || ''}
                                    onValueChange={(val) => handleChange('relationship', val)}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select relationship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="family">Family</SelectItem>
                                        <SelectItem value="friend">Friend</SelectItem>
                                        <SelectItem value="colleague">Colleague</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Input
                                id="notes"
                                value={formData.notes || ''}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Recipient
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
