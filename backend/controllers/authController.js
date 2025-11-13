
const bcrypt = require('bcryptjs');
const User = require('../models/User');               // your user model
const generateToken = require('../utils/generateToken');  // your token helper

exports.loginUser = async (req, res) => {
  const timestamp = new Date().toISOString();
  const { email, password } = req.body;

  console.log(`[${timestamp}]  Login attempt received:`, { email });

  // Input validation
  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    console.warn(`[${timestamp}]  Invalid login input`);
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.warn(`[${timestamp}]  No user found with email: ${normalizedEmail}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.warn(`[${timestamp}]  Password mismatch for user: ${normalizedEmail}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // (Optional) Could increment login count, log user login action, etc.

    const token = generateToken(user);
    if (!token) {
      console.error(`[${timestamp}]  Token generation failed for user: ${normalizedEmail}`);
      return res.status(500).json({ success: false, message: 'Server error during login' });
    }

    // Successful login response
    console.log(`[${timestamp}] ✅ User logged in: ${normalizedEmail}`);
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (err) {
    console.error(`[${timestamp}]  Login error:`, err.message);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};
