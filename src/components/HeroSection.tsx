// src/components/HeroSection.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative h-[78vh] md:h-[84vh] flex items-center overflow-hidden">
      {/* Prefer video background if present */}
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

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-center mx-auto text-white">
          <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
            {t('heroTitle')}
          </motion.h2>

          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }} className="mt-4 text-lg md:text-xl text-gray-100/90">
            {t('heroSubtitle')}
          </motion.p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#products" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#e1ba66] text-black font-semibold shadow-lg transform hover:-translate-y-0.5 transition">
              {t('heroLearnMore')}
            </Link>

            <button onClick={() => window.location.href = '/api/catalog'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:opacity-95">
              {t('downloadCatalogButton')}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gem accent — still uses the accent color */}
      <div className="pointer-events-none absolute right-8 top-20 hidden lg:block">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e1ba66] to-yellow-400 shadow-2xl opacity-90 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
