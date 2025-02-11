import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGem } from 'react-icons/fa';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Add a delay to ensure a smooth transition.
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#e1ba66] to-[#ffc107]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Gem Icon with pulse and glow effect */}
          <motion.div
            className="mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
          >
            <FaGem className="text-white text-8xl drop-shadow-2xl" />
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="mb-2 text-5xl font-extrabold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Elite Gems
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="mb-8 text-xl font-semibold text-white drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Exquisite Gemstone Jewelry
          </motion.div>

          {/* Pulsing Loading Text */}
          <motion.div
            className="text-lg font-semibold text-white drop-shadow-md"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
