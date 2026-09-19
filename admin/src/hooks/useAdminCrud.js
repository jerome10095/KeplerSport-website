import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useAdminList(table, key, order = 'created_at') {
  return useQuery({ queryKey: ['admin', key], enabled: Boolean(supabase), queryFn: async () => { const { data, error } = await supabase.from(table).select('*').order(order, { ascending: false }); if (error) throw error; return data || []; } });
}

export function useAdminSave(table, key) {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (record) => { const { id, ...payload } = record; const query = id ? supabase.from(table).update(payload).eq('id', id) : supabase.from(table).insert(payload); const { data, error } = await query.select().single(); if (error) throw error; return data; }, onSuccess: () => client.invalidateQueries({ queryKey: ['admin', key] }) });
}

export function useAdminDelete(table, key) {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (id) => { const { error } = await supabase.from(table).delete().eq('id', id); if (error) throw error; }, onSuccess: () => client.invalidateQueries({ queryKey: ['admin', key] }) });
}
