import React from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  id: number;
  key: string;
  image: string;
}

const services: Service[] = [
  { id: 1, key: 'necklaces', image: '/images/necklace.jpg' },
  { id: 2, key: 'pendants', image: '/images/pendant.jpg' },
  { id: 3, key: 'looseGemstones', image: '/images/loose-gemstones.jpg' },
  { id: 4, key: 'manufacturingServices', image: '/images/manufacturing.jpg' },
];

const ServiceCards: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-16 bg-white dark:bg-gray-700">
      <h2 className="text-3xl font-bold text-center mb-12">
        {t('services')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={service.image}
              alt={t(service.key)}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{t(service.key)}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
