import { useQuery } from '@tanstack/react-query';
import { teamsService } from '../api/services/teams';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => teamsService.getAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
