const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  updateUserRole
} = require('../controllers/userController');

// ✅ GET /api/users — Admin: Get all users
router.get('/', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 👥 Admin requested all users`);
  try {
    await getAllUsers(req, res);
  } catch (err) {
    console.error('❌ Error in getAllUsers:', err.message);
    next(err);
  }
});

// ✅ DELETE /api/users/:id — Admin: Delete user
router.delete('/:id', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 🗑️ Admin deleting user ID: ${req.params.id}`);
  try {
    await deleteUser(req, res);
  } catch (err) {
    console.error('❌ Error in deleteUser:', err.message);
    next(err);
  }
});

// ✅ PUT /api/users/:id/role — Admin: Update user role
router.put('/:id/role', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 🔧 Admin updating role for user ID: ${req.params.id}`);
  try {
    await updateUserRole(req, res);
  } catch (err) {
    console.error('❌ Error in updateUserRole:', err.message);
    next(err);
  }
});

module.exports = router;