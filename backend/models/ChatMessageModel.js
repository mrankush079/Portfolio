
const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    sender: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false },
    versionKey: false
  }
);

// Optional: index to speed up queries by user and createdAt
ChatMessageSchema.index({ user: 1, createdAt: -1 });

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);

module.exports = ChatMessage;
