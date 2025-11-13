
// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();

  // If status code hasn’t been set, default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Log full error details internally (for dev/debug)
  console.error(`[${timestamp}]  Error occurred:`, {
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    user: req.user?.email || 'guest'
  });

  // Prepare response payload
  const response = {
    success: false,
    message: err.message || 'Internal Server Error'
  };

  // Include stack trace only in non-production
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  // Send JSON response
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
