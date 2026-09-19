import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useHighlights({ sport, featuredOnly = false, limit = 24 } = {}) {
  return useQuery({
    queryKey: ['highlights', { sport, featuredOnly, limit }],
    queryFn: async () => {
      if (!supabase) return [];
      let query = supabase.from('media').select('*').eq('media_type', 'video').order('created_at', { ascending: false }).limit(limit);
      if (featuredOnly) query = query.eq('is_featured', true);
      if (sport) query = query.contains('tags', [sport]);
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });
}
