const express = require('express');
const router = express.Router();

const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  exportProjectsCSV
} = require('../controllers/projectController');

const { protect, requireAdmin } = require('../middleware/authMiddleware');

// ✅ GET /api/projects — Public: Get all projects
router.get('/', async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 📦 Fetching all projects`);
  try {
    await getProjects(req, res);
  } catch (err) {
    console.error('❌ Error in getProjects:', err.message);
    next(err);
  }
});

// ✅ POST /api/projects — Admin: Add new project
router.post('/', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 🛠️ Admin adding new project`);
  try {
    await addProject(req, res);
  } catch (err) {
    console.error('❌ Error in addProject:', err.message);
    next(err);
  }
});

// ✅ PUT /api/projects/:id — Admin: Update project
router.put('/:id', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ✏️ Admin updating project ID: ${req.params.id}`);
  try {
    await updateProject(req, res);
  } catch (err) {
    console.error('❌ Error in updateProject:', err.message);
    next(err);
  }
});

// ✅ DELETE /api/projects/:id — Admin: Delete project
router.delete('/:id', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 🗑️ Admin deleting project ID: ${req.params.id}`);
  try {
    await deleteProject(req, res);
  } catch (err) {
    console.error('❌ Error in deleteProject:', err.message);
    next(err);
  }
});

// ✅ GET /api/projects/export/csv — Admin: Export projects as CSV
router.get('/export/csv', protect, requireAdmin, async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] 📤 Admin exporting projects to CSV`);
  try {
    await exportProjectsCSV(req, res);
  } catch (err) {
    console.error('❌ Error in exportProjectsCSV:', err.message);
    next(err);
  }
});

module.exports = router;