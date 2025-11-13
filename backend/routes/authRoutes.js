
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// @route   POST /api/auth/login
// @desc    Admin login (secure & structured)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}]  Login attempt:`, { email });

  try {
    //  Validate input
    if (!email?.trim() || !password?.trim()) {
      console.warn(`[${timestamp}]  Missing email or password`);
      return res.status(400).json({ message: 'Email and password are required' });
    }

    //  Fetch user
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      console.warn(`[${timestamp}]  No user found with email: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}]  Incorrect password for ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //  Ensure admin role
    if (user.role !== 'admin') {
      console.warn(`[${timestamp}]  Unauthorized role: ${user.role}`);
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    //  Environment sanity check
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error(`[${timestamp}]  Missing JWT secrets in environment`);
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    //  Generate tokens
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    //  Store refresh token in DB
    await RefreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    console.log(`[${timestamp}]  Login successful for: ${user.email}`);

    //  Send tokens and profile info
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        name: user.name || 'Admin',
        role: user.role
      }
    });
  } catch (err) {
    console.error(`[${timestamp}]  Login error:`, err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
