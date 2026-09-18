import apiClient from '../client';

export const athletesApi = {
  getAll: (params = {}) =>
    apiClient.get('/athletes', {
      params: {
        'populate[profileImage]': 'true',
        'populate[team]': 'true',
        'sort[0]': 'fullName:asc',
        ...params,
      },
    }),
  getByTeam: (teamId) =>
    apiClient.get('/athletes', {
      params: {
        'filters[team][id][$eq]': teamId,
        'populate[profileImage]': 'true',
      },
    }),
};