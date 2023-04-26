const notFound = (req, res, next) => {
  const error = new Error(`Page ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || `Server error`;
  res.status(status).json({ success: false, message });
};

module.exports = { notFound, errorHandler };
