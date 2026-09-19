import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useGlobal() {
  return useQuery({
    queryKey: ['global'],
    queryFn: async () => {
      const { data } = await apiClient.get('/global');
      return data?.data ?? data ?? {};
    },
    staleTime: 5 * 60_000,
  });
}