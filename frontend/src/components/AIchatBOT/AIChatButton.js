import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Mic } from 'react-feather';

const AIChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
  // console.log(" API_BASE:", API_BASE); // Uncomment to debug

  const showChatModal = () => setIsChatOpen(true);
  const closeChatModal = () => setIsChatOpen(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      const botReply = {
        sender: 'bot',
        text: data.reply || 'Sorry, I didn’t understand that.',
      };
      setMessages((prev) => [...prev, botReply]);
      speak(botReply.text);
    } catch (err) {
      console.error(' Chat error:', err.message);
      const errorReply = {
        sender: 'bot',
        text: 'AI assistant is currently unavailable.',
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
  };

  return (
    <>
      <button
        onClick={showChatModal}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-50 animate-pulse-bounce"
        title="AI Assistant"
      >
        <MessageSquare size={28} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 sm:right-10 md:right-16 w-[90%] sm:w-80 bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50 animate-fadeIn flex flex-col max-h-[70vh]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-purple-700">AI Assistant</h3>
            <button onClick={closeChatModal} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm px-3 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-purple-100 text-purple-800 self-end text-right'
                    : 'bg-gray-100 text-gray-700 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-purple-500 animate-pulse">AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
            >
              Send
            </button>
            <button
              onClick={startListening}
              className="text-purple-600 hover:text-purple-800"
              title="Voice input"
            >
              <Mic size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatButton;