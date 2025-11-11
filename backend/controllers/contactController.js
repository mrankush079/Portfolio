const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const { logAction } = require('../utils/logger');

// @desc    Handle contact form submission
// @route   POST /api/contact
exports.handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `
    });

    await logAction({
      action: 'Contact Form Submitted',
      user: email,
      details: { name, message }
    });

    res.status(201).json({ message: 'Message received and email sent successfully!' });
  } catch (error) {
    console.error('Error handling contact form:', error.message);
    res.status(500).json({ message: 'Server error while submitting message' });
  }
};

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
};

// @desc    Export contact messages as CSV (admin only)
// @route   GET /api/contact/export/csv
exports.exportMessagesCSV = async (req, res) => {
  try {
    const messages = await Contact.find();
    const fields = ['name', 'email', 'message', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(messages);

    res.header('Content-Type', 'text/csv');
    res.attachment('messages.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting messages:', error.message);
    res.status(500).json({ message: 'Server error while exporting messages' });
  }
};