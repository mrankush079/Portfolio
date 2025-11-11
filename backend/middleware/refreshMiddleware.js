const jwt = require('jsonwebtoken');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

exports.verifyRefreshToken = async (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const stored = await RefreshTokenModel.findOne({ token });
    if (!stored) return res.status(403).json({ message: 'Invalid refresh token' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Refresh token expired or invalid' });
  }
};