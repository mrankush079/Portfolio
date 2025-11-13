
const fs = require('fs');
const path = require('path');

//  Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, 'audit.log');

/**
 * Logs an action (audit trail)
 * @param {Object} params
 * @param {string} params.action - Action name
 * @param {string} params.user - User performing the action
 * @param {Object} params.details - Additional metadata
 */
const logAction = ({ action, user, details }) => {
  const timestamp = new Date().toISOString();

  //  Validate inputs
  const safeAction = typeof action === 'string' && action.trim() ? action.trim() : 'Unknown Action';
  const safeUser = typeof user === 'string' && user.trim() ? user.trim() : 'Unknown User';
  const safeDetails =
    details && typeof details === 'object'
      ? details
      : { info: 'No additional details provided' };

  //  Create log entry
  const entry = [
    `\n[${timestamp}] 🧾 ACTION: ${safeAction}`,
    `USER: ${safeUser}`,
    `DETAILS: ${JSON.stringify(safeDetails, null, 2)}`,
    '---------------------------------------------\n'
  ].join('\n');

  //  Output to console (for real-time debugging)
  console.log(entry);

  //  Append to file (async, non-blocking)
  fs.appendFile(logFile, entry, (err) => {
    if (err) {
      console.error(`[${timestamp}]  Failed to write to audit log:`, err.message);
    }
  });
};

// Optional: Rotate logs if size exceeds 5 MB
const rotateLogsIfNeeded = () => {
  try {
    const stats = fs.statSync(logFile);
    if (stats.size > 5 * 1024 * 1024) {
      const archive = path.join(logDir, `audit-${Date.now()}.log`);
      fs.renameSync(logFile, archive);
      console.log(`[${new Date().toISOString()}]  Log file rotated -> ${path.basename(archive)}`);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(' Log rotation error:', err.message);
    }
  }
};

// Run rotation check every 6 hours
setInterval(rotateLogsIfNeeded, 6 * 60 * 60 * 1000);

module.exports = { logAction };
