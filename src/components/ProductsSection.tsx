import React, { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// Import a variety of icons:
import { GiDiamondRing, GiStoneBlock, GiDiamondHard } from 'react-icons/gi';
import { FaRing, FaGem, FaDotCircle } from 'react-icons/fa';

interface Product {
  id: number;
  titleKey: string;
  shortDescriptionKey: string;
  longDescriptionKey: string;
  icon: JSX.Element;
}

const products: Product[] = [
  {
    id: 1,
    titleKey: 'product1Title',
    shortDescriptionKey: 'product1ShortDesc',
    longDescriptionKey: 'product1LongDesc',
    // Diamond Quartz Necklaces
    icon: <GiDiamondRing size={60} className="text-[#e1ba66]" />,
  },
  {
    id: 2,
    titleKey: 'product2Title',
    shortDescriptionKey: 'product2ShortDesc',
    longDescriptionKey: 'product2LongDesc',
    // Loose Diamond Quartz
    icon: <GiStoneBlock size={60} className="text-[#e1ba66]" />,
  },
  {
    id: 3,
    titleKey: 'product3Title',
    shortDescriptionKey: 'product3ShortDesc',
    longDescriptionKey: 'product3LongDesc',
    // Bracelets
    icon: <FaRing size={60} className="text-[#e1ba66]" />,
  },
  {
    id: 4,
    titleKey: 'product4Title',
    shortDescriptionKey: 'product4ShortDesc',
    longDescriptionKey: 'product4LongDesc',
    // Pendants
    icon: <FaGem size={60} className="text-[#e1ba66]" />,
  },
  {
    id: 5,
    titleKey: 'product5Title',
    shortDescriptionKey: 'product5ShortDesc',
    longDescriptionKey: 'product5LongDesc',
    // Bangles
    icon: <GiDiamondHard size={60} className="text-[#e1ba66]" />,
  },
  {
    id: 6,
    titleKey: 'product6Title',
    shortDescriptionKey: 'product6ShortDesc',
    longDescriptionKey: 'product6LongDesc',
    // Necklace Beads
    icon: <FaDotCircle size={60} className="text-[#e1ba66]" />,
  },
];

const ProductsSection: React.FC = () => {
  const { t } = useTranslation();
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  return (
    <section id="products" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold dark:text-white">
            {t('productsSectionTitle')}
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {t('productsSectionSubtitle')}
          </p>
        </motion.div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex items-center gap-4 p-6">
                {product.icon}
                <div>
                  <h3 className="text-3xl font-semibold dark:text-white">
                    {t(product.titleKey)}
                  </h3>
                  <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                    {t(product.shortDescriptionKey)}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => toggleExpand(product.id)}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#e1ba66] to-yellow-400 text-black font-bold text-lg rounded-full shadow-lg transition transform hover:scale-105"
                >
                  {expandedProductId === product.id
                    ? t('viewLess')
                    : t('viewMore')}
                </button>
                <AnimatePresence>
                  {expandedProductId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 text-gray-700 dark:text-gray-200"
                    >
                      {t(product.longDescriptionKey)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
