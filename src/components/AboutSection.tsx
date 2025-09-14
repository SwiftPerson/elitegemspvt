// src/components/AboutSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section id="about" className="py-20 bg-gray-50 dark:bg-gray-900" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-3">{t('aboutTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('aboutContent1')}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">{t('service1Title')}</li>
              <li className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">{t('service2Title')}</li>
              <li className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">{t('service3Title')}</li>
              <li className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">{t('service4Title')}</li>
            </ul>
            <div className="mt-6">
              <a href="#contact" className="inline-block px-6 py-2 rounded-full bg-[#e1ba66] font-semibold">{t('getInTouchButton')}</a>
            </div>
          </div>

          <div>
            <img src="/images/about.png" alt={t('aboutTitle')} className="rounded-xl shadow-xl object-cover w-full h-80" loading="lazy" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
