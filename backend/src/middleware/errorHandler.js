export function errorHandler(error, _req, res, _next) {
  const status = error.response?.status || 500;
  const message = error.response?.data || { message: error.message };

  console.error('[API ERROR]', error.message);
  res.status(status).json(message);
}
