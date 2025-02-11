import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-5xl font-bold mb-4">{t('heroTitle')}</h2>
        <p className="text-xl mb-8">{t('heroSubtitle')}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#about"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition"
          >
            {t('heroLearnMore')}
          </a>
          <a
            href="/catalog.pdf"
            download
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition flex items-center justify-center gap-2"
          >
            <FiDownload size={20} /> {t('downloadCatalogButton')}

          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
