const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { logAction } = require('../utils/LogAction');
const fetch = require('node-fetch');

router.post('/', protect, async (req, res) => {
  const { message } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🤖 Chat request: "${message}"`);

  if (!message?.trim()) {
    console.warn(`[${timestamp}] ⚠️ Empty message received`);
    return res.status(400).json({ reply: 'Please enter a valid message.' });
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a friendly AI assistant embedded in a developer portfolio. Answer clearly, helpfully, and professionally. If asked about your skills, describe full-stack capabilities in React, Java, MongoDB, and dashboard building.'
      },
      { role: 'user', content: message }
    ]
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const headers = response.headers.get('content-type');
    const data = await response.json();

    console.log(`[${timestamp}] 📡 GPT API status: ${status}`);
    console.log(`[${timestamp}] 📎 Response headers: ${headers}`);
    console.log(`[${timestamp}] 🧠 GPT raw response:`, JSON.stringify(data, null, 2));

    if (data.error) {
      console.error(`[${timestamp}] ❌ GPT API error:`, data.error.message);
      return res.status(500).json({ reply: `GPT error: ${data.error.message}` });
    }

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.warn(`[${timestamp}] ⚠️ GPT returned no valid reply`);
      return res.status(200).json({ reply: 'Sorry, I couldn’t understand that.' });
    }

    const reply = data.choices[0].message.content;

    await logAction({
      action: 'AI Chat',
      user: req.user?.email || 'guest',
      details: {
        prompt: message,
        reply,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        tokensUsed: data.usage?.total_tokens || 'N/A'
      }
    });

    console.log(`[${timestamp}] 💬 GPT reply: "${reply}"`);
    res.status(200).json({ reply });
  } catch (err) {
    console.error(`[${timestamp}] ❌ GPT fetch error:`, err.message);
    res.status(500).json({ reply: 'AI assistant is currently unavailable.' });
  }
});

module.exports = router;