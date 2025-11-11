const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔐 Login request received:`, { email });

  try {
    // ✅ Validate input
    if (!email?.trim() || !password?.trim()) {
      console.warn(`[${timestamp}] ⚠️ Missing email or password`);
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Find user
    const user = await UserModel.findOne({ email: email.trim() });
    if (!user) {
      console.warn(`[${timestamp}] ❌ User not found:`, email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(`[${timestamp}] 👤 User found: ${user.email} | Role: ${user.role}`);

    // ✅ Check password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}] ❌ Password mismatch for:`, email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // ✅ Check role
    if (user.role !== 'admin') {
      console.warn(`[${timestamp}] 🚫 Access denied: Not an admin →`, user.role);
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // ✅ Generate tokens
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

    await RefreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    console.log(`[${timestamp}] ✅ Login successful for: ${user.email}`);
    console.log(`[${timestamp}] 📤 Sending tokens...`);

    // ✅ Send response
    res.status(200).json({
      accessToken,
      refreshToken,
      email: user.email,
      role: user.role,
      name: user.name || 'Admin'
    });
  } catch (err) {
    console.error(`[${timestamp}] 🔥 Login error:`, err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;