import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { announcementsApi } from '../api/queries/announcements.queries';
import { useSocket } from '../context/useSocket';

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements', 'active'],
    queryFn: async () => {
      const { data } = await announcementsApi.getActive();
      return Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];
    },
    refetchInterval: 45_000,
  });
}

export function useAnnouncementsRealtimeSync() {
  const qc = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = () => qc.invalidateQueries({ queryKey: ['announcements'] });
    socket.on('announcement:changed', handler);
    return () => socket.off('announcement:changed', handler);
  }, [socket, qc]);
}