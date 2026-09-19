import { useAdminDelete, useAdminList, useAdminSave } from './useAdminCrud';
export const useAnnouncementsAdmin = () => useAdminList('announcements', 'announcements');
export const useSaveAnnouncement = () => useAdminSave('announcements', 'announcements');
export const useDeleteAnnouncement = () => useAdminDelete('announcements', 'announcements');
