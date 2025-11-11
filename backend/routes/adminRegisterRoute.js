const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 📝 Admin registration request:`, { email });

  try {
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await UserModel.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = await UserModel.create({
      email: email.trim(),
      password: hashedPassword,
      name: name?.trim() || 'Admin',
      role: 'admin'
    });

    console.log(`[${timestamp}] ✅ Admin registered: ${newUser.email}`);
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(`[${timestamp}] 🔥 Registration error:`, err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;