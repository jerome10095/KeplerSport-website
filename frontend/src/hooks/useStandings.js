import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useStandings(sport) {
  return useQuery({
    queryKey: ['standings', sport],
    queryFn: async () => {
      const { data } = await apiClient.get(`/standings/sport/${sport}`);
      return data.data;
    },
    enabled: !!sport,
  });
}