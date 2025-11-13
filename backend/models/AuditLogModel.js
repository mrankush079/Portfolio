
const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    action:   { type: String, required: true, trim: true },
    user:     { type: String, required: true, trim: true },
    details:  { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,            // adds createdAt & updatedAt automatically :contentReference[oaicite:0]{index=0}
    versionKey: false
  }
);

// Create an index for faster retrieval if needed
AuditLogSchema.index({ createdAt: -1 });

const AuditLogModel = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

module.exports = { AuditLogModel };
