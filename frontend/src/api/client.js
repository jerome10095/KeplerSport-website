import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url;
    const status = err.response?.status;
    console.error(`[API ERROR] ${status} ${url}`, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export const mediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_STRAPI_URL}${path}`;
};

export default apiClient;