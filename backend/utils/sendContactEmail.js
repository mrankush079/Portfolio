const nodemailer = require('nodemailer');

const sendContactEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '📩 New Contact Form Submission',
    html: `
      <h3>New Message from ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  });
};

module.exports = sendContactEmail;