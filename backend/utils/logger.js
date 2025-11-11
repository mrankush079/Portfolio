const fs = require('fs');
const path = require('path');

// ✅ Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, 'audit.log');

const logAction = ({ action, user, details }) => {
  const timestamp = new Date().toISOString();

  // ✅ Defensive fallback
  const safeAction = typeof action === 'string' ? action.trim() : 'Unknown Action';
  const safeUser = typeof user === 'string' ? user.trim() : 'Unknown User';
  const safeDetails = typeof details === 'object' && details !== null ? details : {};

  const entry = [
    `[${timestamp}] ${safeAction} by ${safeUser}`,
    `Details: ${JSON.stringify(safeDetails, null, 2)}`,
    ''
  ].join('\n');

  // ✅ Log to console
  console.log(entry);

  // ✅ Log to file
  fs.appendFile(logFile, entry + '\n', (err) => {
    if (err) {
      console.error(`[${timestamp}] ❌ Failed to write to audit log:`, err.message);
    } else {
      console.log(`[${timestamp}] ✅ Audit log written to file`);
    }
  });
};

module.exports = { logAction };