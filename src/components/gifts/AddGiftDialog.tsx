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
import { useGifts } from '../../hooks/useGifts';
import { useRecipients } from '../../hooks/useRecipients';
import { Gift } from '../../types';
import { Loader2, Plus } from 'lucide-react';

export function AddGiftDialog() {
    const [open, setOpen] = useState(false);
    const { createGift, isCreating } = useGifts();
    const { recipients } = useRecipients();

    const [formData, setFormData] = useState<Partial<Gift>>({
        status: 'purchased',
        purchasePrice: 0,
        year: new Date().getFullYear(),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.recipientId || formData.purchasePrice === undefined) return;

        try {
            await createGift(formData as any);
            setOpen(false);
            setFormData({
                status: 'purchased',
                purchasePrice: 0,
                year: new Date().getFullYear(),
            });
        } catch (error: any) {
            console.error("Failed to create gift", error);
            alert(`Failed to create gift: ${error.message || error}`);
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
                    Add Gift
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Gift</DialogTitle>
                        <DialogDescription>
                            Record a new gift purchase.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="recipient" className="text-right">
                                Recipient
                            </Label>
                            <Select
                                value={formData.recipientId}
                                onValueChange={(val) => handleChange('recipientId', val)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select who this is for" />
                                </SelectTrigger>
                                <SelectContent>
                                    {recipients.map(r => (
                                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Item Name
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
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.purchasePrice || ''}
                                onChange={(e) => handleChange('purchasePrice', parseFloat(e.target.value))}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val) => handleChange('status', val)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="purchased">Purchased</SelectItem>
                                    <SelectItem value="wrapped">Wrapped</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

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
                            Save Gift
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
