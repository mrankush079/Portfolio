// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db'); // ✅ Must export a function
// const errorHandler = require('./middleware/errorHandler'); // ✅ Centralized error handler

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3003;
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// // --- Middleware ---
// app.use(cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200 }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// // --- Routes ---
// app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes')); // Admin dashboard, logs, refresh
// app.use('/admin', require('./routes/adminLoginRoute')); // ✅ Admin login route
// app.use('/admin', require('./routes/adminRegisterRoute')); // ✅ Admin register route

// // --- Health Check ---
// app.get('/', (req, res) => {
//   res.send({ message: '✅ Portfolio backend is running!' });
// });

// // --- Error Handler ---
// app.use(errorHandler);

// // --- Start Server ---
// app.listen(PORT, () => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🚀 Server running on http://localhost:${PORT}`);
// });







// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db'); // ✅ Must export a function
// const errorHandler = require('./middleware/errorHandler'); // ✅ Centralized error handler
// const seedAdmin = require('./utils/seedAdmin'); // ✅ Auto-create admin from .env

// // --- Load Environment Variables ---
// dotenv.config();
// console.log(`[${new Date().toISOString()}] 🔧 Environment variables loaded`);

// // --- Initialize Express ---
// const app = express();
// const PORT = process.env.PORT || 3003;
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// // --- Connect to MongoDB ---
// connectDB()
//   .then(() => {
//     console.log(`[${new Date().toISOString()}] ✅ MongoDB connected`);
//     return seedAdmin(); // 🌱 Auto-create admin if missing
//   })
//   .catch((err) => {
//     console.error(`[${new Date().toISOString()}] ❌ MongoDB connection failed:`, err.message);
//   });

// // --- Middleware ---
// app.use(cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200 }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// console.log(`[${new Date().toISOString()}] 🛡️ Middleware configured`);

// // --- Routes ---
// app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes')); // Admin dashboard, logs
// app.use('/admin', require('./routes/adminLoginRoute')); // ✅ Admin login
// app.use('/admin', require('./routes/adminRegisterRoute')); // ✅ Admin register
// console.log(`[${new Date().toISOString()}] 🚦 Routes mounted`);

// // --- Health Check ---
// app.get('/', (req, res) => {
//   res.send({ message: '✅ Portfolio backend is running!' });
// });

// // --- Error Handler ---
// app.use(errorHandler);

// // --- Start Server ---
// app.listen(PORT, () => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🚀 Server running on http://localhost:${PORT}`);
// });









// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db'); // ✅ Must export a function
// const errorHandler = require('./middleware/errorHandler'); // ✅ Centralized error handler
// const seedAdmin = require('./utils/seedAdmin'); // ✅ Auto-create admin from .env

// // --- Load Environment Variables ---
// dotenv.config();
// console.log(`[${new Date().toISOString()}] 🔧 Environment variables loaded`);

// const app = express();
// const PORT = process.env.PORT || 3003;
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// // --- Connect to MongoDB ---
// connectDB()
//   .then(() => {
//     console.log(`[${new Date().toISOString()}] ✅ MongoDB connected`);
//     return seedAdmin(); // 🌱 Auto-create admin if missing
//   })
//   .catch((err) => {
//     console.error(`[${new Date().toISOString()}] ❌ MongoDB connection failed:`, err.message);
//   });

// // --- Middleware ---
// app.use(cors({ origin: FRONTEND_URL, optionsSuccessStatus: 200 }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// console.log(`[${new Date().toISOString()}] 🛡️ Middleware configured`);

// // --- Routes ---
// app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes')); // Admin dashboard, logs
// app.use('/admin', require('./routes/adminLoginRoute')); // ✅ Admin login
// app.use('/admin', require('./routes/adminRegisterRoute')); // ✅ Admin register
// app.use('/api/chat', require('./routes/chatRoutes')); // 🤖 AI chatbot route
// console.log(`[${new Date().toISOString()}] 🚦 Routes mounted`);

// // --- Health Check ---
// app.get('/', (req, res) => {
//   res.send({ message: '✅ Portfolio backend is running!' });
// });

// // --- Error Handler ---
// app.use(errorHandler);

// // --- Start Server ---
// app.listen(PORT, () => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🚀 Server running on http://localhost:${PORT}`);
// });








// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db'); // ✅ Must export a function
// const errorHandler = require('./middleware/errorHandler'); // ✅ Centralized error handler
// const seedAdmin = require('./utils/seedAdmin'); // ✅ Auto-create admin from .env

// // --- Load Environment Variables ---
// dotenv.config();
// console.log(`[${new Date().toISOString()}] 🔧 Environment variables loaded`);

// const app = express();
// const PORT = process.env.PORT || 3003;

// // --- Allow multiple frontend origins ---
// const FRONTEND_URLS = [
//   process.env.FRONTEND_URL || 'http://localhost:3000',
//   'https://portfolio-git-main-mrankush079s-projects.vercel.app',
//   'https://portfolio-seven-kappa-78.vercel.app',
//   'https://portfolio-q375val6j-mrankush079s-projects.vercel.app'
// ];

// // --- Connect to MongoDB ---
// connectDB()
//   .then(() => {
//     console.log(`[${new Date().toISOString()}] ✅ MongoDB connected`);
//     return seedAdmin(); // 🌱 Auto-create admin if missing
//   })
//   .catch((err) => {
//     console.error(`[${new Date().toISOString()}] ❌ MongoDB connection failed:`, err.message);
//   });

// // --- Middleware ---
// app.use(cors({
//   origin: FRONTEND_URLS,
//   credentials: true,
//   optionsSuccessStatus: 200
// }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// console.log(`[${new Date().toISOString()}] 🛡️ Middleware configured`);

// // --- Routes ---
// app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes')); // Admin dashboard, logs
// app.use('/admin', require('./routes/adminLoginRoute')); // ✅ Admin login
// app.use('/admin', require('./routes/adminRegisterRoute')); // ✅ Admin register
// app.use('/api/chat', require('./routes/chatRoutes')); // 🤖 AI chatbot route
// console.log(`[${new Date().toISOString()}] 🚦 Routes mounted`);

// // --- Health Check ---
// app.get('/', (req, res) => {
//   res.send({ message: '✅ Portfolio backend is running!' });
// });

// // --- Error Handler ---
// app.use(errorHandler);

// // --- Start Server ---
// app.listen(PORT, () => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 🚀 Server running on port ${PORT}`);
// });











const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db'); // ✅ Must export a function
const errorHandler = require('./middleware/errorHandler'); // ✅ Centralized error handler
const seedAdmin = require('./utils/seedAdmin'); // ✅ Auto-create admin from .env

// --- Load Environment Variables ---
dotenv.config();
console.log(`[${new Date().toISOString()}] 🔧 Environment variables loaded`);

const app = express();
const PORT = process.env.PORT || 3003;

// --- Allow multiple frontend origins ---
const FRONTEND_URLS = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://portfolio-git-main-mrankush079s-projects.vercel.app',
  'https://portfolio-seven-kappa-78.vercel.app',
  'https://portfolio-q375val6j-mrankush079s-projects.vercel.app'
];

// --- Connect to MongoDB ---
connectDB()
  .then(() => {
    console.log(`[${new Date().toISOString()}] ✅ MongoDB connected`);
    return seedAdmin(); // 🌱 Auto-create admin if missing
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] ❌ MongoDB connection failed:`, err.message);
  });

// --- Middleware ---
app.use(cors({
  origin: FRONTEND_URLS,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(`[${new Date().toISOString()}] 🛡️ Middleware configured`);

// --- Routes ---
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // Admin dashboard, logs
app.use('/admin', require('./routes/adminLoginRoute')); // ✅ Admin login
app.use('/admin', require('./routes/adminRegisterRoute')); // ✅ Admin register
app.use('/api/chat', require('./routes/chatRoutes')); // 🤖 AI chatbot route
console.log(`[${new Date().toISOString()}] 🚦 Routes mounted`);

// --- Health Check ---
app.get('/', (req, res) => {
  res.send({ message: '✅ Portfolio backend is running!' });
});

// ✅ Extended Health Route
app.get('/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;

    const statusMap = {
      0: '🔴 Disconnected',
      1: '🟢 Connected',
      2: '🟡 Connecting',
      3: '🟠 Disconnecting'
    };

    res.status(200).json({
      status: '✅ Backend is healthy',
      mongoStatus: statusMap[dbState] || '⚠️ Unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: '❌ Health check failed',
      error: error.message
    });
  }
});

// --- Error Handler ---
app.use(errorHandler);

// --- Start Server ---
app.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🚀 Server running on port ${PORT}`);
});