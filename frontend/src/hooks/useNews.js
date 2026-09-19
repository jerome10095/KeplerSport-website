import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { newsApi } from '../api/queries/news.queries';
import { useSocket } from '../context/useSocket';

export function useNews(params = {}) {
  return useQuery({
    queryKey: ['news', params],
    queryFn: async () => {
      const { data } = await newsApi.getAll(params);
      return data ?? [];
    },
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['news', 'featured'],
    queryFn: async () => {
      const { data } = await newsApi.getFeatured();
      return data?.data ?? data ?? [];
    },
  });
}

export function useNewsItem(slug) {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const { data } = await newsApi.getBySlug(slug);
      return data?.data ?? data ?? null;
    },
    enabled: !!slug,
  });
}

export function useNewsRealtimeSync() {
  const qc = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = () => qc.invalidateQueries({ queryKey: ['news'] });
    socket.on('news:changed', handler);
    return () => socket.off('news:changed', handler);
  }, [socket, qc]);
}