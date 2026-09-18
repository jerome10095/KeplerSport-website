import apiClient from '../client';

export const newsApi = {
  getAll: (params = {}) =>
    apiClient.get('/news', {
      params: {
        'populate[coverImage]': 'true',
        'sort[0]': 'publishedAt:desc',
        'pagination[pageSize]': 12,
        ...params,
      },
    }),

  getBySlug: (slug) => apiClient.get(`/news/slug/${slug}`),

  getFeatured: () =>
    apiClient.get('/news', {
      params: {
        'filters[isFeatured][$eq]': true,
        'populate[coverImage]': 'true',
        'pagination[pageSize]': 3,
      },
    }),
};