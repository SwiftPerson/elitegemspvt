import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineWechat } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const FloatingChatButton: React.FC = () => {
  const { i18n } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const currentLanguage = i18n.language;

  const handleChatClick = () => {
    if (currentLanguage === 'zh') {
      setShowQR(true);
    } else {
      // Replace 'your-number' with your WhatsApp number in international format.
      window.open('https://wa.me/+923339134320', '_blank');
    }
  };

  return (
    <>
      <button
        onClick={handleChatClick}
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition"
        title="Chat with us"
      >
        {currentLanguage === 'zh' ? <AiOutlineWechat size={24} /> : <FaWhatsapp size={24} />}
      </button>
      {showQR && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/images/wechat-qr.png" alt="WeChat QR Code" className="mx-auto mb-4 h-96 w-auto object-contain" />
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
