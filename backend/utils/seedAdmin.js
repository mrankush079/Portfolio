
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim()?.toLowerCase();
  const rawPassword = process.env.ADMIN_PASSWORD?.trim(); // Use a dedicated ADMIN_PASSWORD env var
  const name = 'Ankush Choudhary';

  const timestamp = new Date().toISOString();

  if (!email || !rawPassword) {
    console.warn(`[${timestamp}]  Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env`);
    return;
  }

  try {
    const existingAdmin = await UserModel.findOne({ email });
    if (existingAdmin) {
      console.log(`[${timestamp}]  Admin already exists: ${email}`);
      return;
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    const newAdmin = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      role: 'admin'
    });

    console.log(`[${timestamp}]  Admin seeded successfully: ${newAdmin.email}`);
  } catch (err) {
    console.error(`[${timestamp}]  Admin seeding error:`, err.message);
  }
};

module.exports = seedAdmin;
