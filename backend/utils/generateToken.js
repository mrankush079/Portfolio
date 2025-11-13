
const jwt = require('jsonwebtoken');

const generateToken = (user, options = {}) => {
  const timestamp = new Date().toISOString();

  if (!user || !user._id || !user.email || !user.role) {
    console.warn(`[${timestamp}]  Invalid user object passed to generateToken`);
    return null;
  }

  const { type = 'access', expiresIn = (type === 'access' ? '15m' : '7d') } = options;

  const secret = type === 'access'
    ? process.env.JWT_SECRET
    : process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    console.error(`[${timestamp}]  JWT secret for "${type}" token is missing in environment`);
    return null;
  }

  try {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      type
    };

    const token = jwt.sign(payload, secret, { expiresIn });
    console.log(`[${timestamp}]  ${type.charAt(0).toUpperCase() + type.slice(1)} token generated for user: ${user.email}`);
    return token;
  } catch (err) {
    console.error(`[${timestamp}]  Token generation failed for user ${user.email}:`, err.message);
    return null;
  }
};

module.exports = generateToken;
