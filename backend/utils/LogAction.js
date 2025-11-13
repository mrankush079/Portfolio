

const { AuditLogModel } = require('../models/AuditLogModel');
const fs = require('fs');
const path = require('path');

exports.logAction = async ({ action, user, details = {}, silent = false }) => {
  const timestamp = new Date().toISOString();

  if (!action?.trim() || !user?.trim()) {
    if (!silent) {
      console.warn(`[${timestamp}]  logAction skipped: Missing action or user`);
    }
    return;
  }

  const cleanAction = action.trim();
  const cleanUser = user.trim();

  try {
    //  Save to MongoDB
    await AuditLogModel.create({
      action: cleanAction,
      user: cleanUser,
      details,
      createdAt: new Date()
    });

    if (!silent) {
      console.log(`[${timestamp}]  Audit log saved: ${cleanAction} by ${cleanUser}`);
    }

    //  Mirror to audit.log file
    const logDir = path.join(__dirname, '../logs');
    const logPath = path.join(logDir, 'audit.log');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const fileEntry = `[${timestamp}] ${cleanUser} → ${cleanAction}\n`;
    fs.appendFileSync(logPath, fileEntry);
  } catch (err) {
    console.error(`[${timestamp}]  Audit log failed:`, err.message);
  }
};