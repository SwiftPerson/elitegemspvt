import React from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEtsy,
  FaEbay,
  FaShopify,
  FaArrowUp,
  FaEnvelope,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const social = [
  { id: 'facebook', href: '#', icon: FaFacebookF, label: 'Facebook' },
  { id: 'instagram', href: '#', icon: FaInstagram, label: 'Instagram' },
  { id: 'twitter', href: '#', icon: FaTwitter, label: 'Twitter' },
  { id: 'etsy', href: 'https://elitegemsprivate.etsy.com/', icon: FaEtsy, label: 'Etsy' },
  { id: 'ebay', href: 'https://ebay.com/usr/elitegems_pvt', icon: FaEbay, label: 'eBay' },
  { id: 'shopify', href: '#', icon: FaShopify, label: 'Shopify' },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const subscribeByEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (!email) {
      alert(t('newsletterEnterEmail') || 'Please enter your email.');
      return;
    }
    const subject = encodeURIComponent('Subscribe: Elite Gems Newsletter');
    const body = encodeURIComponent(`Please subscribe ${email} to the Elite Gems newsletter.`);
    window.location.href = `mailto:elitegems@protonmail.com?subject=${subject}&body=${body}`;
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gem-darker border-t border-adaptive-border overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Column 1: Brand + Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt={t('siteTitle') || 'Elite Gems'} className="w-11 h-11 object-contain" />
              <div>
                <div className="font-display text-lg font-bold gold-gradient-text">Elite Gems</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-adaptive-secondary/60">Private Limited</div>
              </div>
            </div>

            <div className="text-sm text-adaptive-secondary space-y-2">
              <div>
                <span className="text-adaptive-primary/80 font-medium">{t('Address') || 'Address'}:</span>{' '}
                <span>{t('contactAddress')}</span>
              </div>
              <div>
                <span className="text-adaptive-primary/80 font-medium">Email:</span>{' '}
                <a href="mailto:elitegems@protonmail.com" className="text-gold/70 hover:text-gold transition-colors">
                  elitegems@protonmail.com
                </a>
              </div>
              <div>
                <span className="text-adaptive-primary/80 font-medium">WhatsApp:</span>{' '}
                <a href="https://wa.me/+923339134320" target="_blank" rel="noreferrer" className="text-gold/70 hover:text-gold transition-colors">
                  +92 333 9134320
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              {social.map(s => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full border border-adaptive-border bg-adaptive-glass flex items-center justify-center hover:border-gold/30 hover:bg-gold/10 hover:text-gold text-adaptive-secondary transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col md:items-center">
            <h4 className="font-display text-sm font-semibold text-adaptive-primary mb-4 tracking-wide">{t('followUs') || 'Quick Links'}</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '#about', label: t('navAbout') },
                { href: '#services', label: t('navServices') },
                { href: '#products', label: t('navProducts') },
                { href: '#gallery', label: 'Gallery' },
                { href: '#contact', label: t('navContact') },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-adaptive-secondary hover:text-gold transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold/30" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-adaptive-secondary hover:text-gold transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/30" />
                  {t('privacy') || 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter + Back to top */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-display text-sm font-semibold text-adaptive-primary mb-4 tracking-wide">{t('newsletterTitle') || 'Newsletter'}</h4>

            <form onSubmit={subscribeByEmail} className="flex w-full max-w-sm">
              <label htmlFor="newsletter" className="sr-only">{t('newsletterPlaceholder') || 'Your email'}</label>
              <input
                id="newsletter"
                name="email"
                type="email"
                placeholder={t('newsletterPlaceholder') || 'you@example.com'}
                className="flex-1 px-4 py-2.5 rounded-l-xl bg-adaptive-glass border border-adaptive-border border-r-0 text-adaptive-primary text-sm placeholder-adaptive-secondary/50 focus:border-gold/30 focus:outline-none transition-colors"
                aria-label={t('newsletterPlaceholder') || 'Your email'}
                required
              />
              <button
                type="submit"
                aria-label={t('subscribe') || 'Subscribe'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-r-xl btn-gold text-sm"
              >
                <FaEnvelope size={12} />
                <span className="hidden sm:inline">{t('subscribe') || 'Subscribe'}</span>
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-adaptive-border bg-adaptive-glass flex items-center justify-center hover:border-gold/30 hover:bg-gold/10 text-adaptive-secondary hover:text-gold transition-all duration-300"
                aria-label={t('backToTop') || 'Back to top'}
              >
                <FaArrowUp size={12} />
              </button>
              <span className="text-xs text-adaptive-secondary/60">{t('footerRights', { year })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-adaptive-border py-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[11px] text-adaptive-secondary/50 tracking-wider">
            {t('footerTextSimple') || 'Quality gemstones • Ethical sourcing • Worldwide shipping'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
