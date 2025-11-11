const rateLimit = require('express-rate-limit');

// ✅ Named export for contact form limiter
exports.contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per minute
  message: 'Too many requests, please try again later.'
});