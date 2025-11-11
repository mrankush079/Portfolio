// const { AuditLogModel } = require('../models/AuditLogModel');

// exports.logAction = async ({ action, user, details }) => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] 📝 Logging action:`, { action, user });

//   try {
//     if (!action || !user) {
//       console.warn(`[${timestamp}] ⚠️ Missing action or user in logAction`);
//       return;
//     }

//     await AuditLogModel.create({
//       action: action.trim(),
//       user: user.trim(),
//       details: details || {}
//     });

//     console.log(`[${timestamp}] ✅ Audit log saved: ${action} by ${user}`);
//   } catch (err) {
//     console.error(`[${timestamp}] ❌ Audit log failed:`, err.message);
//   }
// };





const { AuditLogModel } = require('../models/AuditLogModel');
const fs = require('fs');
const path = require('path');

exports.logAction = async ({ action, user, details = {}, silent = false }) => {
  const timestamp = new Date().toISOString();

  if (!action?.trim() || !user?.trim()) {
    if (!silent) {
      console.warn(`[${timestamp}] ⚠️ logAction skipped: Missing action or user`);
    }
    return;
  }

  const cleanAction = action.trim();
  const cleanUser = user.trim();

  try {
    // ✅ Save to MongoDB
    await AuditLogModel.create({
      action: cleanAction,
      user: cleanUser,
      details,
      createdAt: new Date()
    });

    if (!silent) {
      console.log(`[${timestamp}] ✅ Audit log saved: ${cleanAction} by ${cleanUser}`);
    }

    // ✅ Mirror to audit.log file
    const logDir = path.join(__dirname, '../logs');
    const logPath = path.join(logDir, 'audit.log');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const fileEntry = `[${timestamp}] ${cleanUser} → ${cleanAction}\n`;
    fs.appendFileSync(logPath, fileEntry);
  } catch (err) {
    console.error(`[${timestamp}] ❌ Audit log failed:`, err.message);
  }
};