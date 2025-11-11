// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UserModel } = require('../models/UserModel');
// const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('🔐 Admin login request received:', { email });

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied: Admins only' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

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

//     await RefreshTokenModel.create({
//       token: refreshToken,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });

//     res.status(200).json({
//       accessToken,
//       refreshToken,
//       email: user.email,
//       role: user.role,
//       name: user.name || 'Admin'
//     });
//   } catch (err) {
//     console.error('🔥 Login error:', err.message);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Correct default import
const UserModel = require('../models/UserModel');
const { RefreshTokenModel } = require('../models/RefreshTokenModel');

// ✅ Defensive check
if (!UserModel || typeof UserModel.findOne !== 'function') {
  console.error('❌ UserModel is not defined or invalid');
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔐 Admin login request received:`, { email });

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

    // ✅ Check role
    if (user.role !== 'admin') {
      console.warn(`[${timestamp}] 🚫 Access denied: Not an admin →`, user.role);
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}] ❌ Password mismatch for:`, email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // ✅ Generate tokens
    let accessToken, refreshToken;
    try {
      accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );
    } catch (tokenErr) {
      console.error(`[${timestamp}] ❌ Token generation failed:`, tokenErr.message);
      return res.status(500).json({ message: 'Token generation error' });
    }

    await RefreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    console.log(`[${timestamp}] ✅ Login successful for: ${user.email}`);
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