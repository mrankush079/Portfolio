const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.GMAIL_PASS?.trim();
  const name = 'Ankush Choudhary';

  if (!email || !password) {
    console.warn('⚠️ Missing ADMIN_EMAIL or GMAIL_PASS in .env');
    return;
  }

  const existingAdmin = await UserModel.findOne({ email });
  if (existingAdmin) {
    console.log(`✅ Admin already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    email,
    password: hashedPassword,
    name,
    role: 'admin'
  });

  console.log(`🌱 Admin seeded: ${email}`);
};

module.exports = seedAdmin;