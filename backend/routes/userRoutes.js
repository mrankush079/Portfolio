
const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/userController');

/**
 *  GET /api/users
 * @desc Admin — Get all users
 * @access Private (Admin only)
 */
router.get('/', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 👥 Admin "${req.user?.email}" requested all users`);

  try {
    await getAllUsers(req, res);
  } catch (err) {
    console.error(`[${timestamp}]  Error fetching users:`, err.message);
    res.status(500).json({ message: 'Failed to fetch users. Please try again later.' });
  }
});

/**
 *  DELETE /api/users/:id
 * @desc Admin — Delete a user by ID
 * @access Private (Admin only)
 */
router.delete('/:id', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]  Admin "${req.user?.email}" deleting user ID: ${req.params.id}`);

  try {
    await deleteUser(req, res);
  } catch (err) {
    console.error(`[${timestamp}]  Error deleting user:`, err.message);
    res.status(500).json({ message: 'Failed to delete user. Please try again later.' });
  }
});

/**
 *  PUT /api/users/:id/role
 * @desc Admin — Update user role (e.g., "user" → "admin")
 * @access Private (Admin only)
 */
router.put('/:id/role', protect, requireAdmin, async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔧 Admin "${req.user?.email}" updating role for user ID: ${req.params.id}`);

  try {
    await updateUserRole(req, res);
  } catch (err) {
    console.error(`[${timestamp}]  Error updating user role:`, err.message);
    res.status(500).json({ message: 'Failed to update user role. Please try again later.' });
  }
});

module.exports = router;
