// Global error handler middleware for Express
// Remove unused 'next' parameter
export const errorMiddleware = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Oops! Something went wrong";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
