const Project = require('../models/Project');
const { Parser } = require('json2csv');
const { logAction } = require('../utils/logger');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};

// @desc    Add a new project
// @route   POST /api/projects
exports.addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    if (req.user?.role === 'admin') {
      await logAction({
        action: 'Add Project',
        user: req.user.email,
        details: savedProject
      });
    }

    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error adding project:', error.message);
    res.status(500).json({ message: 'Server error while adding project' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });

    if (req.user?.role === 'admin') {
      await logAction({
        action: 'Update Project',
        user: req.user.email,
        details: updated
      });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ message: 'Server error while updating project' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    if (req.user?.role === 'admin') {
      await logAction({
        action: 'Delete Project',
        user: req.user.email,
        details: { projectId: req.params.id }
      });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ message: 'Server error while deleting project' });
  }
};

// @desc    Export all projects as CSV
// @route   GET /api/projects/export/csv
exports.exportProjectsCSV = async (req, res) => {
  try {
    const projects = await Project.find();
    const fields = ['title', 'description', 'techStack', 'repoLink', 'liveLink', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(projects);

    res.header('Content-Type', 'text/csv');
    res.attachment('projects.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting projects:', error.message);
    res.status(500).json({ message: 'Server error while exporting projects' });
  }
};