import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { matchesApi } from '../api/queries/matches.queries';

export function useMatchLive(matchId) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      if (supabase) {
        const { data, error } = await supabase
          .from('v_matches_full')
          .select('*')
          .eq('id', matchId)
          .single();
        if (error) throw error;
        return data;
      }

      const { data } = await matchesApi.getById(matchId);
      return data.data;
    },
    enabled: Boolean(matchId),
    staleTime: 20_000,
    refetchInterval: supabase ? 30_000 : false,
  });

  useEffect(() => {
    if (!matchId || !supabase) return undefined;

    const channel = supabase
      .channel(`match-${matchId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'matches',
        filter: `id=eq.${matchId}`,
      }, ({ new: update }) => {
        queryClient.setQueryData(['match', matchId], (current) => current ? {
          ...current,
          home_score: update.home_score,
          away_score: update.away_score,
          status: update.status,
          period: update.period,
          minute: update.minute,
          highlights: update.highlights,
          updated_at: update.updated_at,
        } : current);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [matchId, queryClient]);

  return query;
}
