import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gem-dark">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gem-dark/80 via-gem-dark/40 to-gem-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-gem-dark/60 via-transparent to-gem-dark/60" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-16 hidden lg:block pointer-events-none">
        <motion.div
          className="w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute bottom-32 left-12 hidden lg:block pointer-events-none">
        <motion.div
          className="w-20 h-20 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(240,210,122,0.3) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          {/* Subtitle tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 px-5 py-2 rounded-full border border-gold/20 bg-gold/5"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-gold-light font-medium">
              Premium Gemstones & Craftsmanship
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="gold-gradient-text">{t('heroTitle')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed mb-10"
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="#products" className="btn-gold inline-flex items-center justify-center gap-2 text-sm">
              {t('heroLearnMore')}
            </Link>
            <button
              onClick={() => window.location.href = '/api/catalog'}
              className="btn-outline-gold inline-flex items-center justify-center gap-2 text-sm"
            >
              {t('downloadCatalogButton')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <FaChevronDown className="text-gold/40 text-xs" />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gem-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
