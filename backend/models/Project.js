const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    repoLink: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String, //  Optional: for uploaded image path
      default: '',
    },
    featured: {
      type: Boolean, //  Optional: for dashboard filtering
      default: false,
    },
  },
  {
    timestamps: true, //  Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Project', projectSchema);