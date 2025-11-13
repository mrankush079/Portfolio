
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel'); //  Correct
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// Utility: Token expiry calculator
const getExpiryDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

// @route   POST /admin/login
// @desc    Admin login route
router.post('/login', async (req, res) => {
  const timestamp = new Date().toISOString();
  const { email, password } = req.body;

  console.log(`[${timestamp}]  Admin login attempt:`, { email });

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    await RefreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: getExpiryDate(7)
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      email: user.email,
      role: user.role,
      name: user.name || 'Admin'
    });

  } catch (err) {
    console.error(`[${timestamp}]  Login error:`, err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;