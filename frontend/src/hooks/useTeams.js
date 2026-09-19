import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '../api/queries/teams.queries';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data } = await teamsApi.getAll();
      return toCollection(data);
    },
  });
}

function toCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export function useTeam(slug) {
  return useQuery({
    queryKey: ['team', slug],
    queryFn: async () => {
      const { data } = await teamsApi.getBySlug(slug);
      return data?.data ?? data ?? null;
    },
    enabled: !!slug,
  });
}