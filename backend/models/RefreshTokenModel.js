
const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))  // default 7 days expiry
    },
    revoked: {
      type: Boolean,
      default: false
    },
    revokedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Add an index so expired tokens can be cleaned up efficiently
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshTokenModel =
  mongoose.models.RefreshToken || mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = { RefreshTokenModel };
