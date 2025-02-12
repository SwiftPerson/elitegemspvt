import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  key: string;
  image: string;
}

const products: Product[] = [
  { id: 1, key: 'product1Title', image: '/images/necklace.jpeg' },       // Gemstone Necklaces
  { id: 2, key: 'product2Title', image: '/images/pendant.jpeg' },         // Gemstone Pendants
  { id: 3, key: 'product3Title', image: '/images/loose-gemstones.jpeg' },  // Loose Gemstones
  { id: 4, key: 'product4Title', image: '/images/manufacturing.jpeg' },     // Custom Orders
  { id: 5, key: 'product5Title', image: '/images/bangles.jpeg' },          // Bangles
  { id: 6, key: 'product6Title', image: '/images/bracelets.jpeg' },        // Bracelets
  { id: 7, key: 'product7Title', image: '/images/specimens.jpeg' },         // Specimens
  { id: 8, key: 'product8Title', image: '/images/necklace-beads.jpeg' },    // Necklace Beads
  { id: 9, key: 'product9Title', image: '/images/rosary.jpeg' },            // Rosary
];

const ProductsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      id="products"
      className="py-20 bg-gray-50 dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          {t('productsTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={product.image}
                alt={t(product.key)}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold dark:text-white">
                  {t(product.key)}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="/catalog.pdf"
            download
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e1ba66] to-yellow-400 text-black font-bold text-lg rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
          >
            <FiDownload size={24} className="mr-2" />
            {t('downloadCatalogButton')}
          </a>
        </div>
      </div>
    </motion.section>
  );
};


export default ProductsSection;
