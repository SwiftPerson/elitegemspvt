// src/components/Header.tsx
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineGlobal, AiOutlineDownload } from 'react-icons/ai';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // shrink on scroll
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close language menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    if (langOpen) window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [langOpen]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') localStorage.setItem('language', code);
    setLangOpen(false);
  };

  const downloadCatalog = async () => {
    try {
      setDownloading(true);
      const res = await fetch('/api/catalog');
      if (!res.ok) throw new Error('catalog generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EliteGems-Catalog.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(t('catalogError') || 'Could not generate catalog. Try again later.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 backdrop-blur bg-white/70 dark:bg-gray-900/70 shadow-md' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo & brand */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img
            src="/images/logo.png"
            alt={t('siteTitle') || 'Elite Gems'}
            className={`object-contain transition-all ${isScrolled ? 'h-10' : 'h-16'}`}
            loading="eager"
            width={64}
            height={64}
          />
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight">Elite Gems</div>
            <div className="text-xs text-gray-500">Exquisite Gemstone Jewelry</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#hero" className="hover:text-[#e1ba66]">{t('navHome')}</a>
          <a href="#about" className="hover:text-[#e1ba66]">{t('navAbout')}</a>
          <a href="#services" className="hover:text-[#e1ba66]">{t('navServices')}</a>
          <a href="#products" className="hover:text-[#e1ba66]">{t('navProducts')}</a>
          <a href="#gallery" className="hover:text-[#e1ba66]">Gallery</a>
          <a href="#contact" className="hover:text-[#e1ba66]">{t('navContact')}</a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Download Catalog (desktop) */}
          <button
            onClick={downloadCatalog}
            disabled={downloading}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e1ba66] text-black font-semibold shadow hover:opacity-95 transition"
            aria-label={t('downloadCatalogButton') || 'Download Catalog'}
          >
            <AiOutlineDownload />
            <span>{downloading ? t('generating') || 'Generating…' : t('downloadCatalogButton')}</span>
          </button>

          {/* Language selector */}
          <div className="relative hidden md:block" ref={langRef}>
            <button
              onClick={() => setLangOpen(s => !s)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full inline-flex items-center"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label="Toggle language menu"
            >
              <AiOutlineGlobal />
              <span className="sr-only">Language</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => changeLanguage(l.code)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${i18n.language === l.code ? 'font-semibold' : ''}`}
                  >
                    <span style={{ fontSize: 18 }}>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition inline-flex items-center"
            aria-label={t('toggleTheme') || 'Toggle theme'}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(s => !s)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 flex flex-col gap-3">
            <a href="#hero" onClick={() => setMobileOpen(false)} className="py-2">{t('navHome')}</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="py-2">{t('navAbout')}</a>
            <a href="#services" onClick={() => setMobileOpen(false)} className="py-2">{t('navServices')}</a>
            <a href="#products" onClick={() => setMobileOpen(false)} className="py-2">{t('navProducts')}</a>
            <a href="#gallery" onClick={() => setMobileOpen(false)} className="py-2">Gallery</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="py-2">{t('navContact')}</a>

            <div className="pt-2">
              <button onClick={() => { downloadCatalog(); setMobileOpen(false); }} className="w-full px-4 py-2 rounded-full bg-[#e1ba66] text-black font-semibold">
                {t('downloadCatalogButton')}
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { changeLanguage(l.code); setMobileOpen(false); }}
                  className={`flex-1 px-3 py-2 rounded-md ${i18n.language === l.code ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`}
                >
                  <span style={{ fontSize: 16, marginRight: 8 }}>{l.flag}</span>{l.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
