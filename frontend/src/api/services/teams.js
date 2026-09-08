import apiClient from '../client';

export const teamsService = {
  getAll: () => apiClient.get('/teams'),
  getBySlug: (slug) => apiClient.get(`/teams/${slug}`),
  getAthletes: (teamId) => apiClient.get(`/teams/${teamId}/athletes`),
  getSchedule: (teamId) => apiClient.get(`/teams/${teamId}/schedule`),
};
