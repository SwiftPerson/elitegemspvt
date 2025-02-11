import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-blue-900 dark:bg-[#e1ba66] text-white py-6">
      <div className="container mx-auto text-center px-4">
        <p>{t('footerText', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
};

export default Footer;
