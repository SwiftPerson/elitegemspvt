// src/components/AboutSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-50 dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-white">{t('aboutTitle')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t('aboutSubtitle')}
          </p>
        </div>
        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Rich Text Content */}
          <div className="space-y-6 dark:text-white">
            <p className="text-lg">{t('aboutContent1')}</p>
            <p className="text-lg">{t('aboutContent2')}</p>
            <p className="text-lg">{t('aboutContent3')}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/about"
                className="px-6 py-3 bg-[#e1ba66] text-black font-semibold rounded-full shadow hover:bg-yellow-500 transition transform hover:scale-105"
              >
                {t('learnMoreButton')}
              </a>
              {/* Update the "Get in Touch" button to scroll to #contact */}
              <a
                href="#contact"
                className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-full shadow hover:bg-gray-600 transition transform hover:scale-105"
              >
                {t('getInTouchButton')}
              </a>
            </div>
          </div>
          {/* Right Column: Image with Decorative Overlay */}
          <div className="relative">
            <img
              src="/images/about.png"
              alt="About Elite Gems"
              className="w-full rounded-lg shadow-2xl object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-[#e1ba66] rounded-full mix-blend-multiply opacity-75 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
