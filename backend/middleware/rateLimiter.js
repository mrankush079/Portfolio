
const rateLimit = require('express-rate-limit');

// Contact form rate limiter
exports.contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute window
  max: 3,                   // limit each IP to 3 requests per windowMs
  standardHeaders: true,    // return RateLimit-* headers
  legacyHeaders: false,      // disable X‑RateLimit-* headers
  message: {
    error: 'Too many contact submissions, please wait 1 minute and try again.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res/*, next*/) => {
    // You can add logging here
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}]  Rate limit exceeded for IP: ${req.ip} on route ${req.originalUrl}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000) + 's'
    });
  }
});
