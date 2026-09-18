import apiClient from '../client';

export const teamsApi = {
  getAll: () => apiClient.get('/teams', {
    params: {
      'populate[logo]': 'true',
      'populate[coverImage]': 'true',
      'sort[0]': 'name:asc',
    },
  }),
  getBySlug: (slug) => apiClient.get(`/teams/slug/${slug}`),
};