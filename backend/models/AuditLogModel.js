const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String, required: true }, // ✅ Always required for traceability
  details: { type: Object, default: {} }, // ✅ Defensive default
  createdAt: { type: Date, default: Date.now } // ✅ Use createdAt for consistency
});

// ✅ Prevent OverwriteModelError during dev/hot reload
const AuditLogModel = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

module.exports = { AuditLogModel };