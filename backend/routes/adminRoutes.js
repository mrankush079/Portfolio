// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UserModel } = require('../models/UserModel');
// const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// // @route   POST /admin/login
// // @desc    Admin login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🔐 Admin login request received:`, { email });

//   try {
//     // ✅ Validate input
//     if (!email?.trim() || !password?.trim()) {
//       console.warn(`[${timestamp}] ⚠️ Missing email or password`);
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // ✅ Find user
//     const user = await UserModel.findOne({ email: email.trim() });
//     if (!user) {
//       console.warn(`[${timestamp}] ❌ User not found:`, email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     console.log(`[${timestamp}] 👤 User found: ${user.email} | Role: ${user.role}`);

//     // ✅ Check password
//     const isMatch = await bcrypt.compare(password.trim(), user.password);
//     if (!isMatch) {
//       console.warn(`[${timestamp}] ❌ Password mismatch for:`, email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // ✅ Check role
//     if (user.role !== 'admin') {
//       console.warn(`[${timestamp}] 🚫 Access denied: Not an admin →`, user.role);
//       return res.status(403).json({ message: 'Access denied: Admins only' });
//     }

//     // ✅ Generate tokens
//     let accessToken, refreshToken;
//     try {
//       accessToken = jwt.sign(
//         { id: user._id, email: user.email, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '15m' }
//       );

//       refreshToken = jwt.sign(
//         { id: user._id },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: '7d' }
//       );
//     } catch (tokenErr) {
//       console.error(`[${timestamp}] 🔐 Token generation failed:`, tokenErr.message);
//       return res.status(500).json({ message: 'Token generation error' });
//     }

//     // ✅ Save refresh token
//     await RefreshTokenModel.create({
//       token: refreshToken,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });

//     console.log(`[${timestamp}] ✅ Admin login successful for: ${user.email}`);
//     console.log(`[${timestamp}] 📤 Sending tokens...`);

//     // ✅ Send response
//     res.status(200).json({
//       accessToken,
//       refreshToken,
//       email: user.email,
//       role: user.role,
//       name: user.name || 'Admin'
//     });
//   } catch (err) {
//     console.error(`[${timestamp}] 🔥 Login error:`, err.message);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UserModel } = require('../models/UserModel');
// const { RefreshTokenModel } = require('../models/RefreshTokenModel');
// const { logAction } = require('../utils/LogAction'); // ✅ Updated import

// // @route   POST /admin/login
// // @desc    Admin login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🔐 Admin login request received:`, { email });

//   try {
//     // ✅ Validate input
//     if (!email?.trim() || !password?.trim()) {
//       console.warn(`[${timestamp}] ⚠️ Missing email or password`);
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // ✅ Find user
//     const user = await UserModel.findOne({ email: email.trim() });
//     if (!user) {
//       console.warn(`[${timestamp}] ❌ User not found:`, email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     console.log(`[${timestamp}] 👤 User found: ${user.email} | Role: ${user.role}`);

//     // ✅ Check password
//     const isMatch = await bcrypt.compare(password.trim(), user.password);
//     if (!isMatch) {
//       console.warn(`[${timestamp}] ❌ Password mismatch for:`, email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // ✅ Check role
//     if (user.role !== 'admin') {
//       console.warn(`[${timestamp}] 🚫 Access denied: Not an admin →`, user.role);
//       return res.status(403).json({ message: 'Access denied: Admins only' });
//     }

//     // ✅ Check env secrets
//     if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
//       console.error(`[${timestamp}] ❌ Missing JWT secrets in .env`);
//       return res.status(500).json({ message: 'Server misconfiguration' });
//     }

//     // ✅ Generate tokens
//     const accessToken = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '7d' }
//     );

//     // ✅ Save refresh token
//     await RefreshTokenModel.create({
//       token: refreshToken,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });

//     console.log(`[${timestamp}] ✅ Admin login successful for: ${user.email}`);

//     // ✅ Audit log
//     await logAction({
//       action: 'Logged in as admin',
//       user: user.email,
//       details: { route: '/admin/login', role: user.role }
//     });

//     // ✅ Send response
//     res.status(200).json({
//       accessToken,
//       refreshToken,
//       email: user.email,
//       role: user.role,
//       name: user.name || 'Admin'
//     });
//   } catch (err) {
//     console.error(`[${timestamp}] 🔥 Login error:`, err.message);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// module.exports = router;









const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');
const ContactModel = require('../models/ContactModel'); // ✅ Added for message fetch
const { logAction } = require('../utils/LogAction');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

// @route   POST /admin/login
// @desc    Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔐 Admin login request received:`, { email });

  try {
    if (!email?.trim() || !password?.trim()) {
      console.warn(`[${timestamp}] ⚠️ Missing email or password`);
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email: email.trim() });
    if (!user) {
      console.warn(`[${timestamp}] ❌ User not found:`, email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(`[${timestamp}] 👤 User found: ${user.email} | Role: ${user.role}`);

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}] ❌ Password mismatch for:`, email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.role !== 'admin') {
      console.warn(`[${timestamp}] 🚫 Access denied: Not an admin →`, user.role);
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error(`[${timestamp}] ❌ Missing JWT secrets in .env`);
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

    console.log(`[${timestamp}] ✅ Admin login successful for: ${user.email}`);

    await logAction({
      action: 'Logged in as admin',
      user: user.email,
      details: {
        route: '/admin/login',
        role: user.role,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

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

// @route   POST /admin/logout
// @desc    Admin logout route
router.post('/logout', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  const userEmail = req.user.email;

  try {
    await RefreshTokenModel.deleteMany({ userId: req.user.id });

    await logAction({
      action: 'Logged out as admin',
      user: userEmail,
      details: {
        route: '/admin/logout',
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    console.log(`[${timestamp}] 🔓 Admin logout successful: ${userEmail}`);
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Logout error:`, err.message);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// @route   GET /admin/messages
// @desc    Fetch all contact messages (admin only)
router.get('/messages', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });
    console.log(`[${timestamp}] 📩 Returning ${messages.length} messages to admin`);
    res.status(200).json(messages);
  } catch (err) {
    console.error(`[${timestamp}] ❌ Failed to fetch messages:`, err.message);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

module.exports = router;