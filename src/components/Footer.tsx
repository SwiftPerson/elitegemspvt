// src/components/Footer.tsx
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
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-[#111827] dark:to-[#0f172a] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Column 1: Brand + Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt={t('siteTitle') || 'Elite Gems'} className="w-12 h-12 object-contain" />
            <div>
              <div className="font-bold">Elite Gems</div>
              <div className="text-sm text-gray-200">Exquisite Gemstone Jewelry</div>
            </div>
          </div>

          <div className="text-sm text-gray-200 space-y-1">
            <div>
              <strong>{t('Address') || 'Address'}:</strong> <span className="block md:inline">{t('contactAddress')}</span>
            </div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:elitegems@protonmail.com" className="underline">
                elitegems@protonmail.com
              </a>
            </div>
            <div>
              <strong>WhatsApp:</strong>{' '}
              <a href="https://wa.me/+923339134320" target="_blank" rel="noreferrer" className="underline">
                +92 333 9134320
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            {social.map(s => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick links */}
        <div className="flex flex-col md:items-center md:justify-center">
          <h4 className="font-semibold mb-3">{t('followUs') || 'Quick Links'}</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <a href="#about" className="hover:text-white">{t('navAbout')}</a>
            </li>
            <li>
              <a href="#services" className="hover:text-white">{t('navServices')}</a>
            </li>
            <li>
              <a href="#products" className="hover:text-white">{t('navProducts')}</a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">{t('privacy') || 'Privacy Policy'}</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">{t('terms') || 'Terms & Conditions'}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Newsletter + Back to top */}
        <div className="flex flex-col items-start md:items-end">
          <h4 className="font-semibold mb-3">{t('newsletterTitle') || 'Newsletter'}</h4>

          <form onSubmit={subscribeByEmail} className="flex w-full max-w-sm gap-2">
            <label htmlFor="newsletter" className="sr-only">{t('newsletterPlaceholder') || 'Your email'}</label>
            <input
              id="newsletter"
              name="email"
              type="email"
              placeholder={t('newsletterPlaceholder') || 'you@example.com'}
              className="flex-1 px-3 py-2 rounded-l-md text-black focus:outline-none"
              aria-label={t('newsletterPlaceholder') || 'Your email'}
              required
            />
            <button
              type="submit"
              aria-label={t('subscribe') || 'Subscribe'}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-r-md bg-[#e1ba66] text-black font-semibold"
            >
              <FaEnvelope />
              <span className="hidden sm:inline">{t('subscribe') || 'Subscribe'}</span>
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={scrollToTop} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label={t('backToTop') || 'Back to top'}>
              <FaArrowUp />
              <span className="text-sm hidden sm:inline">{t('backToTop') || 'Top'}</span>
            </button>
            <div className="text-sm text-gray-200">{t('footerRights', { year })}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-gray-300">
        <div>{t('footerTextSimple') || 'Quality gemstones • Ethical sourcing • Worldwide shipping'}</div>
      </div>
    </footer>
  );
};

export default Footer;
