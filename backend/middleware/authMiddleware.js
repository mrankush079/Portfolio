
const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT token and populate req.user
 */
exports.protect = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(`[${timestamp}]  Unauthorized: No token provided`);
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.warn(`[${timestamp}]  Unauthorized: Token missing after prefix`);
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    console.log(`[${timestamp}]  Token verified for user: ${decoded.email}`);
    next();
  } catch (err) {
    console.error(`[${timestamp}]  Token verification failed:`, err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

/**
 * Middleware: Require user to have admin role
 */
exports.requireAdmin = (req, res, next) => {
  const timestamp = new Date().toISOString();

  if (!req.user) {
    console.warn(`[${timestamp}]  Access denied: No authenticated user`);
    return res.status(403).json({ message: 'Access denied: Authentication required' });
  }

  if (req.user.role !== 'admin') {
    console.warn(`[${timestamp}]  Access denied: Admins only (user role: ${req.user.role})`);
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  console.log(`[${timestamp}]  Admin access granted to user: ${req.user.email}`);
  next();
};

/**
 * Middleware: Require that the user is either the same as the requested user or an admin
 */
exports.requireSelfOrAdmin = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const targetUserId = req.params.userId || req.params.id; // support multiple param names

  if (!req.user) {
    console.warn(`[${timestamp}]  Access denied: No authenticated user`);
    return res.status(403).json({ message: 'Access denied: Authentication required' });
  }

  const isSelf = req.user.id === targetUserId;
  const isAdmin = req.user.role === 'admin';

  if (!isSelf && !isAdmin) {
    console.warn(`[${timestamp}]  Access denied: Not self or admin (user: ${req.user.email}, target: ${targetUserId})`);
    return res.status(403).json({ message: 'Access denied: Not authorized' });
  }

  console.log(`[${timestamp}]  Access granted to user: ${req.user.email} (role: ${req.user.role})`);
  next();
};
