import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGem, FaRing, FaTools, FaDotCircle, FaMagic, FaGem as FaFaceted } from 'react-icons/fa';
import { GiDrill, GiPearlNecklace, GiBigDiamondRing, GiBeveledStar } from 'react-icons/gi';
import Modal from './Modal';
import { services } from '../data/services';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  drilling: GiDrill,
  beads: GiPearlNecklace,
  polishing: FaMagic,
  faceting: GiBeveledStar,
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const currentService = services.find(s => s.id === openServiceId);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-gem-darker overflow-hidden">
      {/* Gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-gem/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 gold-gradient-text">
            {t('servicesTitle')}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-adaptive-secondary max-w-xl mx-auto">{t('servicesSubtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.id] || FaGem;
            return (
              <motion.div
                key={service.id}
                className="group glass-card-hover p-8 relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={() => setOpenServiceId(service.id)}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: service.accentColor }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300"
                    style={{
                      borderColor: `${service.accentColor}30`,
                      background: `${service.accentColor}10`,
                    }}
                  >
                    <Icon size={24} style={{ color: service.accentColor }} />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-adaptive-primary mb-3">{service.title}</h3>
                  <p className="text-adaptive-secondary text-sm leading-relaxed mb-4">{service.description}</p>

                  <span className="text-gold text-sm font-medium group-hover:text-gold-light transition-colors inline-flex items-center gap-1">
                    {t('readMore')} →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {openServiceId !== null && currentService && (
        <Modal isOpen={true} onClose={() => setOpenServiceId(null)}>
          <div className="p-6">
            <h3 className="font-display text-2xl font-bold mb-4 gold-gradient-text">{currentService.title}</h3>
            <p className="text-adaptive-primary/80 leading-relaxed">{currentService.details}</p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ServicesSection;
