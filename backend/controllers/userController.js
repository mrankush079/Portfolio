
const User = require('../models/UserModel');
const { logAction } = require('../utils/logger');

exports.getAllUsers = async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 👥 Admin "${req.user?.email}" requested all users`);

  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error fetching users:`, err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🗑️ Admin "${req.user?.email}" deleting user ID: ${req.params.id}`);

  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.warn(`[${timestamp}] ⚠️ User not found ID: ${req.params.id}`);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await logAction({
      action: 'Delete User',
      user: req.user.email,
      details: { userId: req.params.id }
    });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error deleting user:`, err.message);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

exports.updateUserRole = async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔧 Admin "${req.user?.email}" updating role for user ID: ${req.params.id}`);

  try {
    const { role } = req.body;
    if (!role || typeof role !== 'string') {
      console.warn(`[${timestamp}] ⚠️ Invalid role provided:`, role);
      return res.status(400).json({ success: false, message: 'Valid role is required' });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role: role.trim() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      console.warn(`[${timestamp}] ⚠️ User not found ID: ${req.params.id}`);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await logAction({
      action: 'Update User Role',
      user: req.user.email,
      details: { userId: req.params.id, newRole: role.trim() }
    });

    res.status(200).json({ success: true, user: updated });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error updating user role:`, err.message);
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
};
