export const ROUTES = {
  HOME: '/',
  TEAMS: '/teams',
  TEAM: (slug) => `/teams/${slug}`,
  SCHEDULE: '/schedule',
  MATCH: (id) => `/matches/${id}`,
  NEWS: '/news',
  NEWS_ITEM: (slug) => `/news/${slug}`,
  STANDINGS: '/standings',
  FACILITIES: '/facilities',
};