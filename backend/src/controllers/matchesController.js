import { strapi } from '../services/strapiClient.js';

export async function list(req, res, next) {
  try {
    const response = await strapi.get('/matches', { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}

export async function live(req, res, next) {
  try {
    const response = await strapi.get('/matches', {
      params: {
        ...req.query,
        'filters[status][$eq]': 'live',
      },
    });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}
