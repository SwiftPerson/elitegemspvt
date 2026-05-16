import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX, FiInfo } from 'react-icons/fi';
import { gemCategories, getProductsByCategory, Product } from '../data/gemstones';

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const items = useMemo(() => getProductsByCategory(activeCategory), [activeCategory]);
  const categories = gemCategories;

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Assign varied grid spans for masonry look
  const getSpan = (index: number): string => {
    const patterns = [
      'md:col-span-2 md:row-span-2',
      '',
      '',
      'md:col-span-2',
      '',
      '',
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-section-alt overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sapphire-gem/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">Showcase</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 gold-gradient-text">
            {t('galleryTitle')}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-adaptive-secondary max-w-lg mx-auto">{t('gallerySubtitle')}</p>
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

        {/* Masonry Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${getSpan(i)}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => setSelectedProduct(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gem-dark/90 via-gem-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="glass-card px-4 py-3">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-white/50">{item.type}</p>
                        <span className="text-[10px] text-gold/80 font-medium uppercase tracking-wider">View Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-center py-16 text-adaptive-secondary">
              <p className="font-display text-lg">No items in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gem-darker/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-5xl max-h-full overflow-hidden glass-card border border-white/10 rounded-2xl flex flex-col md:flex-row shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="w-full md:w-2/3 h-[40vh] md:h-auto relative bg-black/20">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain md:object-cover"
                />
                
                {/* Close Button Mobile */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:hidden w-10 h-10 rounded-full bg-gem-dark/60 text-white flex items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Info side */}
              <div className="w-full md:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-adaptive-glass border-t md:border-t-0 md:border-l border-white/5">
                {/* Close Button Desktop */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="hidden md:flex absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 text-adaptive-secondary items-center justify-center hover:bg-gold/10 hover:text-gold hover:border-gold/20 border border-white/10 transition-all duration-300"
                >
                  <FiX size={20} />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-[0.1em] mb-4">
                      <FiInfo size={10} />
                      {selectedProduct.type}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold gold-gradient-text leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-adaptive-secondary text-sm md:text-base leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-xs text-adaptive-secondary/60 mb-4 uppercase tracking-widest">Inquiries & Orders</p>
                      <div className="flex flex-wrap gap-3">
                        <a 
                          href="https://wa.me/+923339134320" 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn-gold text-xs px-6 py-3"
                        >
                          Enquire via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

