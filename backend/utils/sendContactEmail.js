
const nodemailer = require('nodemailer');

/**
 * Send a contact form submission email.
 * @param {Object} params
 * @param {string} params.name    — Name of sender
 * @param {string} params.email   — Email of sender
 * @param {string} params.message — Message content
 */
const sendContactEmail = async ({ name, email, message }) => {
  const timestamp = new Date().toISOString();

  // Validate inputs
  if (!name || typeof name !== 'string' || !name.trim() ||
      !email || typeof email !== 'string' || !email.trim() ||
      !message || typeof message !== 'string' || !message.trim()) {
    console.warn(`[${timestamp}]  Invalid parameters for sendContactEmail`, { name, email, message });
    throw new Error('Invalid input data for contact email');
  }

  // Ensure environment variables
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!user || !pass || !adminEmail) {
    console.error(`[${timestamp}]  Missing email configuration in environment (GMAIL_USER, GMAIL_PASS, ADMIN_EMAIL)`);
    throw new Error('Email configuration missing');
  }

  // Create transporter (with recommended secure configuration)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    secure: true, // use TLS
    // Optionally: enable pooling, rate-limiting, etc if many emails
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${user}>`,
    to: adminEmail,
    subject: ' New Contact Form Submission',
    html: `
      <h3>New Message from ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      <hr>
      <p><small>Sent at ${timestamp}</small></p>
    `,
    text: `New message from ${name} (${email}):\n\n${message}`,
    headers: {
      'X-Portfolio-Contact': 'true'
    }
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[${timestamp}]  Contact email sent: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`[${timestamp}]  Error sending contact email:`, err.message);
    throw new Error('Failed to send contact email');
  }
};

module.exports = sendContactEmail;
