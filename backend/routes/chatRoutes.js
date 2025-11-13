
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { logAction } = require('../utils/LogAction');
const fetch = require('node-fetch');

// @route   POST /api/chat
// @desc    Handles AI chat messages (authenticated users only)
router.post('/', protect, async (req, res) => {
  const { message } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🤖 Chat request from ${req.user?.email || 'unknown'}: "${message}"`);

  //  Validate user input
  if (!message?.trim()) {
    console.warn(`[${timestamp}] ⚠️ Empty message received`);
    return res.status(400).json({ reply: 'Please enter a valid message.' });
    }

  //  Ensure API key exists
  if (!process.env.OPENAI_API_KEY) {
    console.error(`[${timestamp}]  Missing OPENAI_API_KEY in environment`);
    return res.status(500).json({ reply: 'AI configuration missing. Please contact the admin.' });
  }

  //  Construct the API payload
  const payload = {
    model: 'gpt-4o-mini', // faster + smarter than gpt-3.5-turbo
    messages: [
      {
        role: 'system',
        content:
          'You are a friendly, professional AI assistant integrated in a developer portfolio. Be concise, polite, and technically helpful. Mention your MERN stack, React, and backend API skills when relevant.'
      },
      { role: 'user', content: message }
    ]
  };

  try {
    //  Send request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    //  Parse response safely
    const data = await response.json();

    if (!response.ok) {
      console.error(`[${timestamp}]  OpenAI API error:`, data.error?.message || 'Unknown error');
      return res.status(500).json({
        reply: `AI error: ${data.error?.message || 'Failed to generate response.'}`
      });
    }

    //  Extract assistant reply
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I couldn’t understand that.';

    //  Log AI interaction
    await logAction({
      action: 'AI Chat Interaction',
      user: req.user?.email || 'guest',
      details: {
        input: message,
        output: reply,
        tokensUsed: data.usage?.total_tokens || 'N/A',
        model: data.model,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    console.log(`[${timestamp}]  GPT reply: "${reply}"`);
    res.status(200).json({ reply });
  } catch (err) {
    console.error(`[${timestamp}]  GPT fetch error:`, err.message);
    res.status(500).json({ reply: 'AI assistant is currently unavailable.' });
  }
});

module.exports = router;
