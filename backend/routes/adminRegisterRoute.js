
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const UserModel = require('../models/UserModel');

router.post('/register', async (req, res) => {
  const timestamp = new Date().toISOString();
  const { email, password, name } = req.body;

  console.log(`[${timestamp}]  Admin registration request:`, { email });

  // Input validation
  if (!email || !password) {
    console.warn(`[${timestamp}]  Missing email or password`);
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    console.warn(`[${timestamp}]  Invalid data types`);
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const existingUser = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      console.warn(`[${timestamp}]  Admin already exists:`, email);
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = await UserModel.create({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      name: name?.trim() || 'Admin',
      role: 'admin'
    });

    console.log(`[${timestamp}]  Admin registered: ${newUser.email}`);
    return res.status(201).json({ message: 'Admin registered successfully' });

  } catch (err) {
    console.error(`[${timestamp}]  Registration error:`, err.message);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;
