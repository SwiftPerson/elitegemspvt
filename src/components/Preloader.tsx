import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGem } from 'react-icons/fa';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2200);
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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d0d14 100%)' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Rotating ring behind the gem */}
          <motion.div
            className="absolute"
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#d4a853',
              borderRightColor: 'rgba(212,168,83,0.3)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Second slower ring */}
          <motion.div
            className="absolute"
            style={{
              width: 170,
              height: 170,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderBottomColor: 'rgba(212,168,83,0.2)',
              borderLeftColor: 'rgba(212,168,83,0.1)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Gem Icon with glow */}
          <motion.div
            className="relative z-10 mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <div className="relative">
              <FaGem className="text-6xl" style={{ color: '#d4a853' }} />
              <div
                className="absolute inset-0 blur-xl opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.6) 0%, transparent 70%)' }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="font-display text-4xl md:text-5xl font-bold tracking-wide mb-2"
            style={{
              background: 'linear-gradient(135deg, #d4a853, #f0d27a, #c9952a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Elite Gems
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="text-sm tracking-[0.3em] uppercase mb-10"
            style={{ color: 'rgba(212,168,83,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Private Limited
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #d4a853, #f0d27a)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
