import { useAdminDelete, useAdminList, useAdminSave } from './useAdminCrud';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
export const useTeamsAdmin = () => useAdminList('teams', 'teams', 'name');
export function useTeam(id) { return useQuery({ queryKey: ['admin', 'team', id], enabled: Boolean(id && supabase), queryFn: async () => { const { data, error } = await supabase.from('teams').select('*').eq('id', id).single(); if (error) throw error; return data; } }); }
export const useSaveTeam = () => useAdminSave('teams', 'teams');
export const useDeleteTeam = () => useAdminDelete('teams', 'teams');
