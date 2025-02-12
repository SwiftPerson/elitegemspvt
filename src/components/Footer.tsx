import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEtsy, FaEbay, FaShopify } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 dark:bg-gradient-to-r dark:from-[#e1ba66] dark:to-[#d4a14a] text-white dark:text-black py-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Social Media & Marketplace Icons */}
        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaFacebookF size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaEtsy size={28} />
          </a>
          <a
            href="https://ebay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaEbay size={28} />
          </a>
          <a
            href="https://shopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white dark:hover:text-black transition duration-300"
          >
            <FaShopify size={28} />
          </a>
        </div>
        {/* Footer Text */}
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Elite Gems. {t('footerRights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
