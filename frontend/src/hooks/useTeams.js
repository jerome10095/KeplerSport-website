import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '../api/queries/teams.queries';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data } = await teamsApi.getAll();
      return data.data;
    },
  });
}

export function useTeam(slug) {
  return useQuery({
    queryKey: ['team', slug],
    queryFn: async () => {
      const { data } = await teamsApi.getBySlug(slug);
      return data.data;
    },
    enabled: !!slug,
  });
}