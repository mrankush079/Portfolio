const jwt = require('jsonwebtoken');

// ✅ Verify JWT token
exports.protect = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(`[${timestamp}] 🔒 Unauthorized: No token provided`);
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log(`[${timestamp}] ✅ Token verified for user: ${decoded.email}`);
    next();
  } catch (err) {
    console.error(`[${timestamp}] ❌ Invalid token:`, err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// ✅ Restrict to admin users
exports.requireAdmin = (req, res, next) => {
  const timestamp = new Date().toISOString();

  if (!req.user || req.user.role !== 'admin') {
    console.warn(`[${timestamp}] 🚫 Access denied: Admins only`);
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  console.log(`[${timestamp}] ✅ Admin access granted`);
  next();
};

// ✅ Restrict to self or admin
exports.requireSelfOrAdmin = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const requestedUserId = req.params.userId;

  if (!req.user) {
    console.warn(`[${timestamp}] 🚫 Access denied: No user context`);
    return res.status(403).json({ message: 'Access denied: Not authorized' });
  }

  if (req.user.role !== 'admin' && req.user.id !== requestedUserId) {
    console.warn(`[${timestamp}] 🚫 Access denied: Not self or admin`);
    return res.status(403).json({ message: 'Access denied: Not authorized' });
  }

  console.log(`[${timestamp}] ✅ Access granted to user: ${req.user.email}`);
  next();
};