const nodemailer = require('nodemailer');

// 1. Load environment variables immediately
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (!GMAIL_USER || !GMAIL_PASS || !ADMIN_EMAIL) {
    console.error(`[Nodemailer Setup] Missing email configuration in environment. Emails will fail.`);
}

// 2. CREATE TRANSPORTER ONCE
// This improves performance and prevents unnecessary setup time on every request.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: GMAIL_USER, 
        pass: GMAIL_PASS 
    },
    secure: true, // Use TLS
    // Optional: Use pooling if you expect high volume
    // pool: true,
});

// Verify connection after creating the transporter (optional but good practice)
transporter.verify((error, success) => {
    if (error) {
        console.error("[Nodemailer Setup] Transporter verification failed:", error.message);
    } else {
        console.log("[Nodemailer Setup] Server is ready to take our messages.");
    }
});


/**
 * Send a contact form submission email.
 * @param {Object} params
 * @param {string} params.name    — Name of sender
 * @param {string} params.email   — Email of sender
 * @param {string} params.message — Message content
 */
const sendContactEmail = async ({ name, email, message }) => {
    const timestamp = new Date().toISOString();

    // Validate inputs
    if (!name || typeof name !== 'string' || !name.trim() ||
        !email || typeof email !== 'string' || !email.trim() ||
        !message || typeof message !== 'string' || !message.trim()) {
        console.warn(`[${timestamp}]  Invalid parameters for sendContactEmail`, { name, email, message });
        throw new Error('Invalid input data for contact email');
    }

    // Check configuration status before attempting to send
    if (!GMAIL_USER || !GMAIL_PASS || !ADMIN_EMAIL) {
        throw new Error('Email configuration missing in environment');
    }
    
    // Check if transporter is ready (optional, but handles early failures)
    if (!transporter) {
         throw new Error('Email transporter not initialized');
    }

    const mailOptions = {
        from: `"Portfolio Contact" <${GMAIL_USER}>`,
        to: ADMIN_EMAIL,
        subject: ` New Contact Form Submission from ${name}`, // Added sender name to subject
        html: `
            <h3>New Message from ${name}</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
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
        console.log(`[${timestamp}]  Contact email sent: ${info.messageId}`);
        return info;
    } catch (err) {
        console.error(`[${timestamp}]  Error sending contact email:`, err.message);
        // Rethrow a generic error so the calling function can handle it gracefully
        throw new Error('Failed to send contact email'); 
    }
};

module.exports = sendContactEmail;