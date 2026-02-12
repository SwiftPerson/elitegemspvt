import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { gemCategories, getProductsByCategory } from '../data/gemstones';

const ProductsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const products = useMemo(() => getProductsByCategory(activeCategory), [activeCategory]);
  const categories = gemCategories;

  return (
    <section id="products" className="relative py-24 md:py-32 bg-gem-dark dark:bg-gem-dark light:bg-[#faf8f5] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">Our Collection</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 gold-gradient-text">
            {t('productsSectionTitle')}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-adaptive-secondary max-w-lg mx-auto">{t('productsSectionSubtitle')}</p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'border-gold/40 bg-gold/10 text-gold shadow-gold/10 shadow-md'
                  : 'border-adaptive-border bg-adaptive-glass text-adaptive-secondary hover:border-gold/20 hover:text-gold'
              }`}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="group relative rounded-2xl overflow-hidden card-adaptive border border-adaptive-border hover:border-gold/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gem-dark via-gem-dark/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 dark-overlay" />

                    {/* Type badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-card text-[10px] uppercase tracking-wider text-adaptive-primary font-medium">
                      {p.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    <h3 className="font-display text-lg font-semibold text-adaptive-primary mb-2 group-hover:text-gold transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="text-sm text-adaptive-secondary leading-relaxed mb-4">
                      {p.description}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm text-gold font-medium hover:text-gold-light transition-colors group/btn"
                    >
                      {t('enquire') || 'Enquire'}
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>

                  {/* Top gold line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {products.length === 0 && (
            <div className="text-center py-16 text-adaptive-secondary">
              <p className="font-display text-lg">No products in this category yet.</p>
              <p className="text-sm mt-2 text-adaptive-secondary/60">Check back soon or contact us for custom orders.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
