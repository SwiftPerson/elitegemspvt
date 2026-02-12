import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGem, FaAward, FaGlobeAmericas } from 'react-icons/fa';

const stats = [
  { icon: FaGem, value: '25+', labelKey: 'Years Experience' },
  { icon: FaAward, value: '10K+', labelKey: 'Gemstones Crafted' },
  { icon: FaGlobeAmericas, value: '30+', labelKey: 'Countries Served' },
];

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative py-24 md:py-32 bg-gem-dark overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,168,83,0.5) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">{t('aboutSubtitle')}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 gold-gradient-text">
            {t('aboutTitle')}
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with decorative frame */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src="/images/about.png"
                alt={t('aboutTitle')}
                className="rounded-2xl object-cover w-full h-[420px] shadow-2xl"
                loading="lazy"
              />
              {/* Gold corner accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-2xl" />
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-adaptive-secondary leading-relaxed text-base md:text-lg mb-6">
              {t('aboutContent1')}
            </p>

            {/* Service badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[t('service1Title'), t('service2Title'), t('service3Title'), t('service4Title')].map((title, i) => (
                <motion.div
                  key={i}
                  className="glass-card-hover p-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-sm text-adaptive-secondary">{title}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-gold inline-flex items-center gap-2 text-sm">
              {t('getInTouchButton')}
            </a>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="max-w-4xl mx-auto mt-20 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center glass-card p-6 md:p-8">
                <Icon className="text-gold mx-auto mb-3 text-2xl" />
                <div className="font-display text-3xl md:text-4xl font-bold gold-gradient-text mb-1">{stat.value}</div>
                <div className="text-xs tracking-wider uppercase text-adaptive-secondary/70">{stat.labelKey}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
