import axios from 'axios';

const strapi = axios.create({
  baseURL: process.env.STRAPI_URL || 'http://localhost:1337/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export { strapi };
