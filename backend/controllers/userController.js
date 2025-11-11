const User = require('../models/UserModel');
const { logAction } = require('../utils/logger');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });

  await logAction({ action: 'Delete User', user: req.user.email, details: { userId: req.params.id } });
  res.json({ message: 'User deleted successfully' });
};

exports.updateUserRole = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  if (!updated) return res.status(404).json({ message: 'User not found' });

  await logAction({ action: 'Update User Role', user: req.user.email, details: updated });
  res.json(updated);
};