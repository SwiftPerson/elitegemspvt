// src/components/GallerySection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const thumbs = ['/images/gallery1.jpeg', '/images/gallery2.jpeg', '/images/gallery3.jpeg', '/images/gallery4.jpeg'];

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">{t('galleryTitle')}</h3>
          <p className="text-gray-600">{t('gallerySubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {thumbs.map((src, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-lg overflow-hidden shadow">
              <img src={src} alt={`gallery-${i}`} className="w-full h-40 object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
