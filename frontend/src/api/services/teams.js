import apiClient from '../client';

export const teamsService = {
  getAll: () => apiClient.get('/teams', {
    params: {
      'populate[logo]': 'true',
      'populate[coverImage]': 'true',
      'sort[0]': 'name:asc',
    },
  }),
  getBySlug: (slug) => apiClient.get(`/teams/slug/${slug}`),
  getById: (id) => apiClient.get(`/teams/${id}`, {
    params: { 'populate[logo]': 'true', 'populate[coach]': 'true' },
  }),
};