// src/components/GallerySection.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import { motion } from 'framer-motion';

interface GalleryItem {
  id: number;
  type: 'video';
  src: string;
  captionKey: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, type: 'video', src: '/videos/diamond-quartz-necklaces.mp4', captionKey: 'galleryItem1Caption' },
  { id: 2, type: 'video', src: '/videos/loose-diamond-quartz.mp4', captionKey: 'galleryItem2Caption' },
  { id: 3, type: 'video', src: '/videos/bracelets.mp4', captionKey: 'galleryItem3Caption' },
  { id: 4, type: 'video', src: '/videos/pendants.mp4', captionKey: 'galleryItem4Caption' },
];

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <motion.section
      id="gallery"
      className="py-20 bg-gray-50 dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-white">{t('galleryTitle')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t('gallerySubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map(item => (
            <div
              key={item.id}
              className="cursor-pointer relative rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
              onClick={() => handleItemClick(item)}
            >
              <video 
                src={item.src} 
                className="w-full h-64 object-cover" 
                muted 
                loop 
                playsInline 
                preload="metadata"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <p className="text-white text-center text-sm">{t(item.captionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <Modal isOpen={true} onClose={closeModal}>
          <div className="p-4">
            <video
              className="w-full h-auto max-h-[80vh] object-contain"
              controls
              autoPlay
              playsInline
            >
              <source src={selectedItem.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
              {t(selectedItem.captionKey)}
            </p>
          </div>
        </Modal>
      )}
    </motion.section>
  );
};

export default GallerySection;
