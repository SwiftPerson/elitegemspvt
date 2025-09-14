// src/components/ProductsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const products = [
  { id: 1, titleKey: 'product1Title', subtitleKey: 'product1ShortDesc', img: '/images/p1.jpeg' },
  { id: 2, titleKey: 'product2Title', subtitleKey: 'product2ShortDesc', img: '/images/p2.jpeg' },
  { id: 3, titleKey: 'product3Title', subtitleKey: 'product3ShortDesc', img: '/images/p3.jpeg' },
  { id: 4, titleKey: 'product4Title', subtitleKey: 'product4ShortDesc', img: '/images/p4.jpeg' },
];

const ProductsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="products" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">{t('productsSectionTitle')}</h2>
          <p className="text-gray-600">{t('productsSectionSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <motion.div key={p.id} whileHover={{ y: -6 }} className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <img src={p.img} alt={t(p.titleKey)} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold">{t(p.titleKey)}</h3>
                <p className="text-sm text-gray-500 mt-2">{t(p.subtitleKey)}</p>
                <div className="mt-4">
                  <a href="#contact" className="inline-block px-4 py-2 rounded-full bg-[#e1ba66] text-black font-semibold">{t('enquire') || 'Enquire'}</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
