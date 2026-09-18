import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { matchesApi } from '../api/queries/matches.queries';

export function useLiveMatchesList() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['matches', 'live-list'],
    queryFn: async () => {
      if (supabase) {
        const { data, error } = await supabase
          .from('v_matches_full')
          .select('*')
          .in('status', ['live', 'halftime'])
          .order('match_date', { ascending: false });
        if (error) throw error;
        return data || [];
      }

      const { data } = await matchesApi.getLive();
      return data.data || [];
    },
    enabled: true,
    refetchInterval: 20_000,
  });

  useEffect(() => {
    if (!supabase) return undefined;
    const channel = supabase
      .channel('live-matches-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        queryClient.invalidateQueries({ queryKey: ['matches', 'live-list'] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return query;
}
