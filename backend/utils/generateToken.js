const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const timestamp = new Date().toISOString();

  if (!user || !user._id || !user.email || !user.role) {
    console.warn(`[${timestamp}] ⚠️ Invalid user object passed to generateToken`);
    return null;
  }

  if (!process.env.JWT_SECRET) {
    console.error(`[${timestamp}] ❌ JWT_SECRET is missing in environment`);
    return null;
  }

  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`[${timestamp}] ✅ Token generated for user: ${user.email}`);
    return token;
  } catch (err) {
    console.error(`[${timestamp}] 🔥 Token generation failed:`, err.message);
    return null;
  }
};

module.exports = generateToken;