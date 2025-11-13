const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const  UserModel  = require('../models/UserModel');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');
const ContactModel = require('../models/ContactModel');
const { logAction } = require('../utils/LogAction');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

/**
 * @route   POST /admin/login
 * @desc    Authenticate admin and return tokens
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}]  Admin login attempt:`, { email });

  try {
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      console.warn(`[${timestamp}]  No user found: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}]  Invalid password for: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.role !== 'admin') {
      console.warn(`[${timestamp}]  Unauthorized role: ${user.role}`);
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error(`[${timestamp}]  Missing JWT secrets`);
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

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

    await logAction({
      action: 'Admin Login',
      user: user.email,
      details: { route: '/admin/login', ip: req.ip, userAgent: req.headers['user-agent'] }
    });

    console.log(`[${timestamp}]  Admin login successful: ${user.email}`);

    res.status(200).json({
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

/**
 * @route   POST /admin/logout
 * @desc    Logout admin and revoke tokens
 */
router.post('/logout', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  const userEmail = req.user.email;

  try {
    await RefreshTokenModel.deleteMany({ userId: req.user.id });

    await logAction({
      action: 'Admin Logout',
      user: userEmail,
      details: { route: '/admin/logout', ip: req.ip, userAgent: req.headers['user-agent'] }
    });

    console.log(`[${timestamp}]  Admin logged out: ${userEmail}`);
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(`[${timestamp}]  Logout error:`, err.message);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

/**
 * @route   GET /admin/messages
 * @desc    Retrieve all contact messages (Admin only)
 */
router.get('/messages', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();

  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });
    console.log(`[${timestamp}]  ${messages.length} messages fetched for admin: ${req.user.email}`);

    res.status(200).json(messages);
  } catch (err) {
    console.error(`[${timestamp}]  Message fetch failed:`, err.message);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

/**
 * @route   DELETE /admin/messages/:id
 * @desc    Delete a contact message by ID (Admin only)
 */
router.delete('/messages/:id', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  const messageId = req.params.id;

  try {
    const deleted = await ContactModel.findByIdAndDelete(messageId);
    if (!deleted) {
      console.warn(`[${timestamp}]  Message not found: ${messageId}`);
      return res.status(404).json({ message: 'Message not found' });
    }

    await logAction({
      action: 'Delete Contact Message',
      user: req.user.email,
      details: { messageId, route: req.originalUrl }
    });

    console.log(`[${timestamp}]  Message deleted: ${messageId}`);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(`[${timestamp}]  Message deletion error:`, err.message);
    res.status(500).json({ message: 'Server error while deleting message' });
  }
});

module.exports = router;