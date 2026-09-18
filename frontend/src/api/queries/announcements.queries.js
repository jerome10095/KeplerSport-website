import apiClient from '../client';

export const announcementsApi = {
  getActive: () => apiClient.get('/announcements/active'),
};