import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipientService } from '../services/recipientService';
import { Recipient } from '../types';

export function useRecipients() {
    const queryClient = useQueryClient();

    const recipientsQuery = useQuery({
        queryKey: ['recipients'],
        queryFn: recipientService.getAll,
    });

    const createRecipientMutation = useMutation({
        mutationFn: (newRecipient: Omit<Recipient, 'id' | 'createdAt' | 'updatedAt'>) =>
            recipientService.create(newRecipient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipients'] });
        },
    });

    return {
        recipients: recipientsQuery.data ?? [],
        isLoading: recipientsQuery.isLoading,
        error: recipientsQuery.error,
        createRecipient: createRecipientMutation.mutateAsync,
        isCreating: createRecipientMutation.isPending,
    };
}
