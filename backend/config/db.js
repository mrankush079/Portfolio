const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error(' MONGO_URL is undefined');

  try {
    const conn = await mongoose.connect(uri); // No options needed in Mongoose v7+
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
