import { useAdminDelete, useAdminList, useAdminSave } from './useAdminCrud';
export const useNewsAdmin = () => useAdminList('news', 'news');
export const useSaveNewsWithSlug = () => useAdminSave('news', 'news');
export const useDeleteNews = () => useAdminDelete('news', 'news');
