import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';
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
  { id: 3, questionKey: 'quickReply3Question', answerKey: 'quickReply3Answer' },
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

  const toggleChat = () => setIsOpen((prev) => !prev);

  const getDynamicReply = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('order') || lowerText.includes('buy')) return t('orderReply');
    if (lowerText.includes('hour') || lowerText.includes('time')) return t('hoursReply');
    if (lowerText.includes('custom') || lowerText.includes('design')) return t('customReply');
    if (lowerText.includes('gemstone') || lowerText.includes('jewelry')) return t('gemReply');
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('discount') || lowerText.includes('offer')) return t('priceReply');
    if (lowerText.includes('location') || lowerText.includes('address') || lowerText.includes('where')) return t('locationReply');
    if (lowerText.includes('contact') || lowerText.includes('help')) return t('contactReply');
    return t('genericBotReply');
  };

  const sendMessage = (text: string) => {
    if (text.trim() === '') return;
    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

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
      {/* Floating Chat Toggle */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #d4a853, #c9952a)',
          boxShadow: '0 4px 20px rgba(212,168,83,0.3)',
        }}
        title="Chat with us"
      >
        {isOpen ? <FiX size={22} className="text-gem-dark" /> : <FiMessageSquare size={22} className="text-gem-dark" />}
      </button>

      {/* Pulsing ring */}
      {!isOpen && (
        <div className="fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full animate-glow-pulse pointer-events-none" />
      )}

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-8 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/[0.06]"
            style={{ background: '#111118' }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/[0.06]"
              style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.1), rgba(212,168,83,0.05))' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center">
                  <FaGem className="text-gem-dark text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{t('chatBotTitle')}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-gem" />
                    <span className="text-[10px] text-white/40">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white/40 hover:text-white transition-colors">
                <FiX size={18} />
              </button>
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-b border-white/[0.04] flex flex-wrap gap-1.5">
              {currentQuickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReplyClick(reply)}
                  className="px-3 py-1.5 rounded-full text-[11px] border border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-gold/30 hover:text-gold hover:bg-gold/5 transition-all"
                >
                  {t(reply.questionKey)}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-60 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.3) transparent' }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[80%] text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gold/20 text-gold-light rounded-br-md'
                        : 'bg-white/[0.05] text-white/70 rounded-bl-md border border-white/[0.06]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06]">
              <div className="flex gap-2">
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
                  placeholder={t('chatBotPlaceholder') || 'Type your message...'}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/25 focus:border-gold/30 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => { sendMessage(input); setInput(''); }}
                  className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <FiSend size={14} className="text-gem-dark" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
