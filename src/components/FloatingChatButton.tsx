import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineWechat } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingChatButton: React.FC = () => {
  const { i18n } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const currentLanguage = i18n.language;

  const handleChatClick = () => {
    if (currentLanguage === 'zh') {
      setShowQR(true);
    } else {
      window.open('https://wa.me/+923339134320', '_blank');
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleChatClick}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
        style={{
          background: currentLanguage === 'zh'
            ? 'linear-gradient(135deg, #07c160, #05a652)'
            : 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
        }}
        title="Chat with us"
      >
        {currentLanguage === 'zh'
          ? <AiOutlineWechat size={24} className="text-white" />
          : <FaWhatsapp size={22} className="text-white" />
        }
      </button>

      {/* Pulsing ring */}
      <div
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full pointer-events-none"
        style={{
          boxShadow: '0 0 0 0 rgba(37,211,102,0.4)',
          animation: 'whatsapp-pulse 2s infinite',
        }}
      />

      <style jsx>{`
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
          70% { box-shadow: 0 0 0 20px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>

      {/* WeChat QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowQR(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-card border border-gold/10 p-8 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all"
              >
                <FiX size={16} />
              </button>
              <h3 className="font-display text-lg font-bold gold-gradient-text text-center mb-4">Scan WeChat QR</h3>
              <img
                src="/images/wechat-qr.png"
                alt="WeChat QR Code"
                className="mx-auto mb-4 h-72 w-auto object-contain rounded-xl"
              />
              <button
                onClick={() => setShowQR(false)}
                className="w-full py-2.5 rounded-xl btn-gold text-sm text-center"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatButton;
