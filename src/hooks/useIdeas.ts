import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ideaService } from '../services/ideaService';
import { Idea } from '../types';

export function useIdeas() {
    const queryClient = useQueryClient();

    const ideasQuery = useQuery({
        queryKey: ['ideas'],
        queryFn: ideaService.getAll,
    });

    const createIdeaMutation = useMutation({
        mutationFn: (newIdea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) =>
            ideaService.create(newIdea),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ideas'] });
        },
    });

    return {
        ideas: ideasQuery.data ?? [],
        isLoading: ideasQuery.isLoading,
        error: ideasQuery.error,
        createIdea: createIdeaMutation.mutateAsync,
        isCreating: createIdeaMutation.isPending,
    };
}
