import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface QuickReply {
  id: number;
  questionKey: string;
  answerKey: string;
}

const quickRepliesInitial: QuickReply[] = [
  { id: 1, questionKey: 'quickReply1Question', answerKey: 'quickReply1Answer' },
  { id: 2, questionKey: 'quickReply2Question', answerKey: 'quickReply2Answer' },
  { id: 3, questionKey: 'quickReply3Question', answerKey: 'quickReply3Answer' }, // "How can I order?"
  { id: 4, questionKey: 'quickReply4Question', answerKey: 'quickReply4Answer' },
];

const quickRepliesOrder: QuickReply[] = [
  { id: 5, questionKey: 'orderQuickReply1Question', answerKey: 'orderQuickReply1Answer' },
  { id: 6, questionKey: 'orderQuickReply2Question', answerKey: 'orderQuickReply2Answer' },
  { id: 7, questionKey: 'orderQuickReply3Question', answerKey: 'orderQuickReply3Answer' },
];

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [conversationFlow, setConversationFlow] = useState<'initial' | 'order'>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Extended dynamic reply check function.
  const getDynamicReply = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('order') || lowerText.includes('buy')) {
      return t('orderReply');
    } else if (lowerText.includes('hour') || lowerText.includes('time')) {
      return t('hoursReply');
    } else if (lowerText.includes('custom') || lowerText.includes('design')) {
      return t('customReply');
    } else if (lowerText.includes('gemstone') || lowerText.includes('jewelry')) {
      return t('gemReply');
    } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('discount') || lowerText.includes('offer')) {
      return t('priceReply');
    } else if (lowerText.includes('location') || lowerText.includes('address') || lowerText.includes('where')) {
      return t('locationReply');
    } else if (lowerText.includes('contact') || lowerText.includes('help')) {
      return t('contactReply');
    }
    return t('genericBotReply');
  };

  const sendMessage = (text: string) => {
    if (text.trim() === '') return;
    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    // If user selects "How can I order?", switch to order flow.
    if (text === t('quickReply3Question')) {
      setConversationFlow('order');
    }

    setTimeout(() => {
      const currentReplies = conversationFlow === 'initial' ? quickRepliesInitial : quickRepliesOrder;
      const matched = currentReplies.find((q) => t(q.questionKey) === text);
      const botText = matched ? t(matched.answerKey) : getDynamicReply(text);
      const botMessage: Message = { sender: 'bot', text: botText };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReplyClick = (reply: QuickReply) => {
    sendMessage(t(reply.questionKey));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentQuickReplies = conversationFlow === 'initial' ? quickRepliesInitial : quickRepliesOrder;

  return (
    <>
      {/* Floating Chat Button positioned at bottom-left */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition"
        title="Chat with us"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-8 z-50 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex items-center justify-between">
              <h3 className="text-white font-bold">{t('chatBotTitle')}</h3>
              <button onClick={toggleChat} className="text-white">
                <FiX size={20} />
              </button>
            </div>
            {/* Quick Reply Options */}
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
              {currentQuickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReplyClick(reply)}
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full text-sm hover:bg-green-500 hover:text-white transition"
                >
                  {t(reply.questionKey)}
                </button>
              ))}
            </div>
            {/* Message Area with scroll */}
            <div className="flex-1 p-4 overflow-y-auto max-h-64 space-y-2">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-xs ${
                      msg.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage(input);
                    setInput('');
                  }
                }}
                placeholder={t('chatBotPlaceholder') || "Type your message..."}
                className="w-full p-2 border border-gray-300  dark:text-black rounded focus:outline-none focus:ring focus:border-green-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
