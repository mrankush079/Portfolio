
const express = require('express');
const router = express.Router();

// Controller functions
const {
  handleContact,
  getMessages,
  exportMessagesCSV
} = require('../controllers/contactController');

// Middleware
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact — Public, rate-limited (no token required)
router.post('/', contactLimiter, async (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]  Contact form submission received`);
  console.log(' Request body:', req.body);

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    console.warn(`[${timestamp}]  Missing fields in contact form`);
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await handleContact(req, res);
  } catch (err) {
    console.error(`[${timestamp}] Error in handleContact:`, err.message);
    next(err);
  }
});

// GET /api/contact — Protected, admin only
router.get('/', protect, requireAdmin, async (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]  Admin requested contact messages`);
  try {
    await getMessages(req, res);
  } catch (err) {
    console.error(`[${timestamp}]  Error in getMessages:`, err.message);
    next(err);
  }
});

// GET /api/contact/export/csv — Protected, admin only
router.get('/export/csv', protect, requireAdmin, async (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]  Admin requested CSV export`);
  try {
    await exportMessagesCSV(req, res);
  } catch (err) {
    console.error(`[${timestamp}]  Error in exportMessagesCSV:`, err.message);
    next(err);
  }
});

module.exports = router;
