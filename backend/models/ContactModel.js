
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 2000,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
  }
);

// Add index to speed up recent queries by 'read' status
contactSchema.index({ read: 1, createdAt: -1 });

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = ContactModel;
