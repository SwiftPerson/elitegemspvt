// src/components/ServicesSection.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGem, FaRing, FaCogs, FaBoxOpen } from 'react-icons/fa';
import Modal from './Modal';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  // Example services array with details for modal (if needed)
  const [openServiceId, setOpenServiceId] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: <FaGem size={40} className="text-[#e1ba66]" />,
      title: t('service1Title'),
      description: t('service1Content'),
      details: t('service1Details'),
    },
    {
      id: 2,
      icon: <FaRing size={40} className="text-[#e1ba66]" />,
      title: t('service2Title'),
      description: t('service2Content'),
      details: t('service2Details'),
    },
    {
      id: 3,
      icon: <FaCogs size={40} className="text-[#e1ba66]" />,
      title: t('service3Title'),
      description: t('service3Content'),
      details: t('service3Details'),
    },
    {
      id: 4,
      icon: <FaBoxOpen size={40} className="text-[#e1ba66]" />,
      title: t('service4Title'),
      description: t('service4Content'),
      details: t('service4Details'),
    },
  ];

  // (Modal functionality can be added as in your previous modal example)
  const currentService = services.find(s => s.id === openServiceId);

  return (
    <motion.section
      id="services"
      className="py-20 bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-white">{t('servicesTitle')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t('servicesSubtitle')}
          </p>
        </div>
        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-lg p-6 transform transition hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold dark:text-white">{service.title}</h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                {service.description}
              </p>
              <button
                onClick={() => setOpenServiceId(service.id)}
                className="mt-4 inline-block text-[#e1ba66] font-semibold hover:underline"
              >
                {t('readMore')}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Popup */}
      {openServiceId !== null && currentService && (
        <Modal isOpen={true} onClose={() => setOpenServiceId(null)}>
          <div className="p-4">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">{currentService.title}</h3>
            <p className="text-lg dark:text-white">{currentService.details}</p>
          </div>
        </Modal>
      )}
    </motion.section>
  );
};

export default ServicesSection;
