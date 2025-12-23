import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { giftService } from '../services/giftService';
import { Gift } from '../types';

export function useGifts() {
    const queryClient = useQueryClient();

    const giftsQuery = useQuery({
        queryKey: ['gifts'],
        queryFn: giftService.getAll,
    });

    const createGiftMutation = useMutation({
        mutationFn: (newGift: Omit<Gift, 'id' | 'createdAt' | 'updatedAt'>) =>
            giftService.create(newGift),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gifts'] });
        },
    });

    return {
        gifts: giftsQuery.data ?? [],
        isLoading: giftsQuery.isLoading,
        error: giftsQuery.error,
        createGift: createGiftMutation.mutateAsync,
        isCreating: createGiftMutation.isPending,
    };
}
