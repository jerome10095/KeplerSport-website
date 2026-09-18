import { strapi } from '../services/strapiClient.js';

export async function list(req, res, next) {
  try {
    const response = await strapi.get('/teams', { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  try {
    const response = await strapi.get(`/teams/${req.params.id}`, { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
}
