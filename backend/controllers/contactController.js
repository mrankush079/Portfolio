
// const Contact = require('../models/ContactModel');
// const nodemailer = require('nodemailer');
// const { Parser } = require('json2csv');
// const { logAction } = require('../utils/logger');

// /**
//  * @desc    Handle contact form submission
//  * @route   POST /api/contact
//  */
// exports.handleContact = async (req, res) => {
//   const timestamp = new Date().toISOString();

//   try {
//     const { name, email, message } = req.body;

//     // Validate inputs
//     if (!name?.trim() || !email?.trim() || !message?.trim()) {
//       console.warn(`[${timestamp}]  Missing fields in contact form`);
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     if (!isValidEmail) {
//       console.warn(`[${timestamp}]  Invalid email format`);
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     // Save to DB
//     const newMessage = new Contact({ name, email, message });
//     await newMessage.save();

//     //  Verify Gmail credentials
//     if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
//       console.error(`[${timestamp}] ❌ Missing Gmail credentials`);
//       return res.status(500).json({ message: 'Email configuration error' });
//     }

//     //  Setup transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     // Send email
//     const mailOptions = {
//       from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
//       subject: ` New Contact Form Submission from ${name}`,
//       html: `
//         <h3>New Contact Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions).catch(err => {
//       console.error(`[${timestamp}]  Email send failed: ${err.message}`);
//     });

//     console.log(`[${timestamp}] 📧 Email sent successfully to admin`);

//     // Log the action
//     try {
//       await logAction({
//         action: 'Contact Form Submitted',
//         user: email,
//         details: { name, message },
//       });
//     } catch (logErr) {
//       console.warn(`[${timestamp}]  Failed to log action: ${logErr.message}`);
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Message received successfully and email sent!',
//     });
//   } catch (error) {
//     console.error(`[${timestamp}]  Error handling contact form: ${error.message}`);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while submitting message',
//     });
//   }
// };

// /**
//  * @desc    Get all contact messages (Admin only)
//  * @route   GET /api/contact
//  */
// exports.getMessages = async (req, res) => {
//   const timestamp = new Date().toISOString();
//   try {
//     const messages = await Contact.find().sort({ createdAt: -1 });
//     console.log(`[${timestamp}] 📬 Retrieved ${messages.length} messages`);
//     res.status(200).json(messages);
//   } catch (error) {
//     console.error(`[${timestamp}]  Error fetching messages: ${error.message}`);
//     res.status(500).json({ message: 'Server error while fetching messages' });
//   }
// };

// /**
//  * @desc    Export contact messages as CSV (Admin only)
//  * @route   GET /api/contact/export/csv
//  */
// exports.exportMessagesCSV = async (req, res) => {
//   const timestamp = new Date().toISOString();
//   try {
//     const messages = await Contact.find();
//     if (!messages.length) {
//       console.warn(`[${timestamp}]  No messages found to export`);
//       return res.status(404).json({ message: 'No messages to export' });
//     }

//     const fields = ['name', 'email', 'message', 'createdAt'];
//     const parser = new Parser({ fields });
//     const csv = parser.parse(messages);

//     res.header('Content-Type', 'text/csv');
//     res.attachment('contact_messages.csv');
//     res.send(csv);

//     console.log(`[${timestamp}]  Contact messages exported to CSV`);
//   } catch (error) {
//     console.error(`[${timestamp}] 🔥 Error exporting messages: ${error.message}`);
//     res.status(500).json({ message: 'Server error while exporting messages' });
//   }
// };





const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const { logAction } = require('../utils/logger');

/**
 * @desc    Handle contact form submission
 * @route   POST /api/contact
 */
exports.handleContact = async (req, res) => {
    const timestamp = new Date().toISOString();

    try {
        const { name, email, message } = req.body;

        // 1. Validate inputs
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            console.warn(`[${timestamp}]  Missing fields in contact form`);
            return res.status(400).json({ message: 'All fields are required' });
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            console.warn(`[${timestamp}]  Invalid email format`);
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // 2. Save to DB (KEEP AWAIT - Must ensure data is saved)
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        // 3. Setup Nodemailer (Error checks remain)
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.error(`[${timestamp}] ❌ Missing Gmail credentials`);
            // WARNING: Since the message is saved, we still respond 201/200 
            // but log the error internally. For this simple form, we'll respond success
            // but add a warning to the response message.
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
            subject: ` New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        // 4. Send Email (FIX: REMOVE AWAIT to make it non-blocking)
        transporter.sendMail(mailOptions).catch(err => {
            console.error(`[${timestamp}]  Email send failed (Non-Blocking): ${err.message}`);
        });

        console.log(`[${timestamp}] 📧 Email send initiated (non-blocking)`);

        // 5. Log Action (FIX: REMOVE AWAIT to make it non-blocking)
        logAction({
            action: 'Contact Form Submitted',
            user: email,
            details: { name, message },
        }).catch(logErr => {
            console.warn(`[${timestamp}]  Failed to log action (Non-Blocking): ${logErr.message}`);
        });

        // 6. Send Response IMMEDIATELY (This fixes the frontend pending issue)
        let responseMessage = 'Message received successfully!';
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
             responseMessage += ' (Admin email alert failed due to configuration)';
        }
        
        res.status(201).json({
            success: true,
            message: responseMessage,
        });
        
    } catch (error) {
        // If an error occurs BEFORE the res.status(201) (e.g., DB failure or validation)
        console.error(`[${timestamp}]  Error handling contact form: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while submitting message',
        });
    }
};

// --- REST OF THE CODE REMAINS UNCHANGED ---

/**
 * @desc    Get all contact messages (Admin only)
 * @route   GET /api/contact
 */
exports.getMessages = async (req, res) => {
    const timestamp = new Date().toISOString();
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        console.log(`[${timestamp}] 📬 Retrieved ${messages.length} messages`);
        res.status(200).json(messages);
    } catch (error) {
        console.error(`[${timestamp}]  Error fetching messages: ${error.message}`);
        res.status(500).json({ message: 'Server error while fetching messages' });
    }
};

/**
 * @desc    Export contact messages as CSV (Admin only)
 * @route   GET /api/contact/export/csv
 */
exports.exportMessagesCSV = async (req, res) => {
    const timestamp = new Date().toISOString();
    try {
        const messages = await Contact.find();
        if (!messages.length) {
            console.warn(`[${timestamp}]  No messages found to export`);
            return res.status(404).json({ message: 'No messages to export' });
        }

        const fields = ['name', 'email', 'message', 'createdAt'];
        const parser = new Parser({ fields });
        const csv = parser.parse(messages);

        res.header('Content-Type', 'text/csv');
        res.attachment('contact_messages.csv');
        res.send(csv);

        console.log(`[${timestamp}]  Contact messages exported to CSV`);
    } catch (error) {
        console.error(`[${timestamp}] 🔥 Error exporting messages: ${error.message}`);
        res.status(500).json({ message: 'Server error while exporting messages' });
    }
};