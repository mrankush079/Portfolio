const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  user: String,
  sender: String, // 'user' or 'bot'
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);