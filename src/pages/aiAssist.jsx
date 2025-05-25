import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot } from 'lucide-react';

function AIAssistant() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const apiUrl = 'http://localhost:5000';

  const welcomeMessages = [
    "Mhoro! Zvinofadza kusangana newe!",
    "Ndingakubatsira sei nhasi?",
    "Pindura mubvunzo wako muShona"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isGenerating) return;

    const userMessage = { text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText })
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      
      const aiMessage = {
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
        source: data.source
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      let errorMsg = 'Failed to get response';
      try {
        const errorData = JSON.parse(err.message);
        errorMsg = errorData.error || errorMsg;
        if (errorData.solution) errorMsg += ` (${errorData.solution})`;
      } catch {
        errorMsg = err.message || errorMsg;
      }
      
      setError(errorMsg);
      const errorMessage = {
        text: 'Ndine urombo, handina kukwanisa kupindura. [Sorry, I encountered an error.]',
        sender: 'ai',
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col" style={{ height: '70vh', maxHeight: '70vh' }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-blue-600 to-green-600 p-3 shadow-md"
      >
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            animate={{ rotate: 15, scale: 1.1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-lg font-bold text-white">Smart Granary AI Assistant</h1>
        </div>
      </motion.div>

      {/* Chat container - now with fixed height */}
      <div 
        className="flex-1 overflow-y-auto p-3 bg-gray-50" 
        style={{ maxHeight: 'calc(70vh - 120px)' }}
      >
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-md w-full text-center">
              <h2 className="text-md font-semibold text-gray-800 mb-3">
                Shona AI Assistant
              </h2>
              <div className="space-y-1">
                {welcomeMessages.map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="text-sm text-gray-600 py-1"
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: msg.sender === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`max-w-[85%] p-3 rounded-lg shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : msg.isError
                      ? 'bg-red-50 text-red-800 border border-red-100'
                      : msg.source === 'dataset'
                      ? 'bg-green-50 text-gray-800 border border-green-100'
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex justify-between items-center mt-1">
                    {msg.source === 'dataset' && (
                      <span className="text-xs text-green-600">From dataset</span>
                    )}
                    <span className="text-xs opacity-70 ml-auto">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-2"
          >
            <div className="max-w-[85%] p-3 bg-white text-gray-800 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-blue-600" />
                </motion.div>
                <p className="text-xs text-gray-600">Kugadzira mhinduro...</p>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-2 text-xs"
          >
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area - compact version */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-2 border-t border-gray-200"
      >
        <div className="flex items-center space-x-1">
          <input
            type="text"
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Nyora mubvunzo wako apa..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
          />
          <motion.button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isGenerating || !inputText.trim()}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default AIAssistant;