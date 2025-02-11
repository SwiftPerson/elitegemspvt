import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="contact"
      className="py-20 bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">{t('contactTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Contact Details */}
          <div className="flex flex-col justify-center space-y-6 dark:text-white">
            <div className="flex items-center gap-4">
              <HiOutlineLocationMarker size={30} className="text-[#e1ba66]" />
              <div>
                <h3 className="text-2xl font-semibold">{t('Address')}</h3>
                <p className="text-lg">{t('contactAddress')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MdEmail size={30} className="text-[#e1ba66]" />
              <div>
                <h3 className="text-2xl font-semibold">Email</h3>
                <a href="mailto:elitegems@protonmail.com" className="text-lg text-blue-400 hover:underline">
                  {t('contactEmail')}
                </a>
              </div>
            </div>
            <div>
              <p className="text-lg">
                {t('contactMessage') || "Feel free to reach out to us for any inquiries or orders."}
              </p>
            </div>
          </div>
          {/* Right Column: Map */}
          <div className="rounded overflow-hidden shadow-lg">
            <iframe
              title="Google Maps - Elite Gems Private Limited"
              src="https://www.google.com/maps?q=34.004689,71.565888&hl=en&z=15&output=embed"
              width="100%"
              height="300"
              className="border-0 rounded"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
