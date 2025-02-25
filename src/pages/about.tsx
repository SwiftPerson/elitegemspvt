// src/pages/about.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChatButton from '../components/FloatingChatButton';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('aboutTitle')}</title>
        <meta name="description" content={t('aboutMetaDescription')} />
      </Head>
      <Header />

      {/* Hero Section */}
      <motion.section
        id="about-hero"
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-hero.jpeg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
            {t('aboutTitle')}
          </h1>
          <p className="mt-4 text-2xl text-white drop-shadow-md">
            {t('aboutTagline')}
          </p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        id="our-story"
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold dark:text-white">
              {t('ourStoryTitle')}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/images/about.png"
                alt={t('ourStoryTitle')}
                className="w-full rounded-lg shadow-2xl object-cover"
              />
            </div>
            <div className="md:w-1/2 text-lg dark:text-gray-300">
              <p className="mb-6 leading-relaxed">
                {t('ourStoryContent')}
              </p>
              <p className="leading-relaxed">
                {t('ourStoryContent2')}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission & Vision Section */}
      <motion.section
        id="our-mission"
        className="py-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 dark:text-white">
            {t('ourMissionTitle')}
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('ourMissionContent')}
          </p>
        </div>
      </motion.section>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default About;
