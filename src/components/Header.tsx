import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineGlobal, AiOutlineDownload } from 'react-icons/ai';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

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
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const navLinks = [
    { href: '#hero', label: t('navHome') },
    { href: '#about', label: t('navAbout') },
    { href: '#services', label: t('navServices') },
    { href: '#products', label: t('navProducts') },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: t('navContact') },
  ];

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 backdrop-blur-xl bg-gem-dark/80 border-b border-white/5 shadow-lg shadow-black/20'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo & brand */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
          <img
            src="/images/logo.png"
            alt={t('siteTitle') || 'Elite Gems'}
            className={`object-contain transition-all duration-500 ${isScrolled ? 'h-9' : 'h-14'}`}
            loading="eager"
            width={56}
            height={56}
          />
          <div className="hidden sm:block">
            <div className="font-display text-lg font-bold leading-tight gold-gradient-text">Elite Gems</div>
            <div className="text-[11px] tracking-[0.15em] uppercase text-white/40">Private Limited</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-gold-light transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Download Catalog */}
          <button
            onClick={downloadCatalog}
            disabled={downloading}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 btn-gold"
            aria-label={t('downloadCatalogButton') || 'Download Catalog'}
          >
            <AiOutlineDownload className="text-base" />
            <span>{downloading ? t('generating') || 'Generating…' : t('downloadCatalogButton')}</span>
          </button>

          {/* Language selector */}
          <div className="relative hidden md:block" ref={langRef}>
            <button
              onClick={() => setLangOpen(s => !s)}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label="Toggle language menu"
            >
              <AiOutlineGlobal size={16} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 glass-card overflow-hidden shadow-glass"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm hover:bg-white/10 transition-colors ${
                        i18n.language === l.code ? 'text-gold font-semibold' : 'text-white/70'
                      }`}
                    >
                      <span style={{ fontSize: 18 }}>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-gold transition-all duration-300"
            aria-label={t('toggleTheme') || 'Toggle theme'}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(s => !s)}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 transition-all duration-300"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gem-dark/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 text-white/70 hover:text-gold-light hover:bg-white/5 rounded-lg transition-all text-lg font-display"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/5">
                <button
                  onClick={() => { downloadCatalog(); setMobileOpen(false); }}
                  className="w-full py-3 rounded-full btn-gold text-center text-sm"
                >
                  {t('downloadCatalogButton')}
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { changeLanguage(l.code); setMobileOpen(false); }}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                      i18n.language === l.code
                        ? 'border-gold/30 bg-gold/10 text-gold'
                        : 'border-white/10 bg-white/5 text-white/60'
                    }`}
                  >
                    <span style={{ fontSize: 16, marginRight: 8 }}>{l.flag}</span>{l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
