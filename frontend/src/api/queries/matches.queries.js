import apiClient from '../client';

export const matchesApi = {
  getAll: (params = {}) =>
    apiClient.get('/matches', {
      params: {
        'populate[homeTeam][populate]': 'logo',
        'populate[awayTeam][populate]': 'logo',
        'sort[0]': 'matchDate:desc',
        ...params,
      },
    }),

  getById: (id) =>
    apiClient.get(`/matches/${id}`, {
      params: {
        'populate[homeTeam][populate]': 'logo',
        'populate[awayTeam][populate]': 'logo',
        'populate[gallery]': 'true',
      },
    }),

  getLive: () => apiClient.get('/matches/live'),
  getUpcoming: () => apiClient.get('/matches/upcoming'),
  getFeatured: () => apiClient.get('/matches/featured'),
};