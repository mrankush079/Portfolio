const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const seedAdmin = require('./utils/seedAdmin');

dotenv.config();
console.log(`[${new Date().toISOString()}] Environment variables loaded`);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Load allowed frontend URLs from .env
const FRONTEND_URLS = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',').map(url => url.trim())
  : [];

console.log('[CORS] Allowed frontend URLs:', FRONTEND_URLS);

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`[CORS] Incoming origin: ${origin}`);
    if (!origin || FRONTEND_URLS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// 🔗 Connect to DB and seed admin
connectDB()
  .then(() => {
    console.log(`[${new Date().toISOString()}] MongoDB connected`);
    return seedAdmin();
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] MongoDB connection failed:`, err.message);
  });

// ⚙️ Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(`[${new Date().toISOString()}] Middleware configured`);

// 🧭 Debug incoming requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// 🚦 Route mounting
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/admin', require('./routes/adminLoginRoute'));
app.use('/admin/register', require('./routes/adminRegisterRoute'));
app.use('/api/chat', require('./routes/chatRoutes'));
console.log(`[${new Date().toISOString()}] Routes mounted`);

// 🩺 Health check
app.get('/', (req, res) => {
  res.send({ message: 'Portfolio backend is running!' });
});

app.get('/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    const statusMap = {
      0: '🔴 Disconnected',
      1: '🟢 Connected',
      2: '🟡 Connecting',
      3: '🟠 Disconnecting',
    };
    res.status(200).json({
      status: 'Backend is healthy',
      mongoStatus: statusMap[dbState] || '⚠️ Unknown',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'Health check failed',
      error: error.message,
    });
  }
});

// 🛡️ Error handler
app.use(errorHandler);

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
});