import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { matchesApi } from '../api/queries/matches.queries';
import { useSocket } from '../context/useSocket';

export function useLiveMatches() {
  return useQuery({
    queryKey: ['matches', 'live'],
    queryFn: async () => {
      const { data } = await matchesApi.getLive();
      return data.data;
    },
    refetchInterval: 30_000,
  });
}

export function useUpcomingMatches() {
  return useQuery({
    queryKey: ['matches', 'upcoming'],
    queryFn: async () => {
      const { data } = await matchesApi.getUpcoming();
      return data.data;
    },
    refetchInterval: 60_000,
  });
}

export function useFeaturedMatch() {
  return useQuery({
    queryKey: ['matches', 'featured'],
    queryFn: async () => {
      const { data } = await matchesApi.getFeatured();
      return data.data;
    },
  });
}

export function useAllMatches(filters = {}) {
  return useQuery({
    queryKey: ['matches', 'all', filters],
    queryFn: async () => {
      const { data } = await matchesApi.getAll(filters);
      return data.data;
    },
  });
}

export function useMatch(id) {
  return useQuery({
    queryKey: ['match', id],
    queryFn: async () => {
      const { data } = await matchesApi.getById(id);
      return data.data;
    },
    enabled: !!id,
  });
}

// Realtime invalidation
export function useMatchRealtimeSync() {
  const qc = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = () => {
      qc.invalidateQueries({ queryKey: ['matches'] });
      qc.invalidateQueries({ queryKey: ['match'] });
    };
    socket.on('match:changed', handler);
    return () => socket.off('match:changed', handler);
  }, [socket, qc]);
}