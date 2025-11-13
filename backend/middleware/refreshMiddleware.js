
const jwt = require('jsonwebtoken');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

exports.verifyRefreshToken = async (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { token } = req.body;

  console.log(`[${timestamp}]  Refresh token received`);

  if (!token || typeof token !== 'string') {
    console.warn(`[${timestamp}]  No refresh token provided or format invalid`);
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const storedToken = await RefreshTokenModel.findOne({ token });
    if (!storedToken) {
      console.warn(`[${timestamp}]  Refresh token not found or revoked`);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    console.log(`[${timestamp}]  Refresh token verified for user ID: ${decoded.id}`);
    next();
  } catch (err) {
    console.error(`[${timestamp}]  Refresh token verification failed:`, err.message);
    return res.status(403).json({ message: 'Refresh token expired or invalid.' });
  }
};
