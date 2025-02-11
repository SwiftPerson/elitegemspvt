import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineGlobal } from 'react-icons/ai';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  };

  return (
    <header className="bg-blue-900  dark:bg-[#1a1a1a] text-white py-4 shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo instead of text */}
        <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
          <img src="/images/logo.png" alt="Elite Gems Logo"     className="h-20 object-contain" />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#hero" className="hover:text-[#e1ba66]">{t('navHome')}</a>
          <a href="#about" className="hover:text-[#e1ba66]">{t('navAbout')}</a>
          <a href="#services" className="hover:text-[#e1ba66]">{t('navServices')}</a>
          <a href="#products" className="hover:text-[#e1ba66]">{t('navProducts')}</a>
          <a href="#contact" className="hover:text-[#e1ba66]">{t('navContact')}</a>
        </nav>
        
        {/* Desktop Toggle Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
            title="Toggle Theme"
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
            title="Toggle Language"
          >
            <AiOutlineGlobal size={20} />
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
            title="Menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-blue-900  dark:bg-[#1a1a1a] text-white px-4 pt-2 pb-4">
          <div className="flex flex-col space-y-3">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e1ba66]"
            >
              {t('navHome')}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e1ba66]"
            >
              {t('navAbout')}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e1ba66]"
            >
              {t('navServices')}
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e1ba66]"
            >
              {t('navProducts')}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e1ba66]"
            >
              {t('navContact')}
            </a>
            <div className="flex space-x-4 pt-2">
              <button
                onClick={toggleTheme}
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
                title="Toggle Theme"
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
                title="Toggle Language"
              >
                <AiOutlineGlobal size={20} />
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
