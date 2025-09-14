// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: '', email: '', message: '' };

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return t('newsletterEnterEmail') || 'Please enter your name.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return t('newsletterEnterEmail') || 'Please enter a valid email.';
    if (!form.message.trim()) return 'Please enter a message.';
    return null;
  };

  const tryMailToFallback = () => {
    const subject = encodeURIComponent(`Contact: ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:elitegems@protonmail.com?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    if (v) {
      setStatus({ type: 'error', message: v });
      return;
    }

    setLoading(true);
    try {
      // Try POST to /api/contact if available
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: t('contactReply') || 'Thanks — we received your message!' });
        setForm(initialForm);
      } else {
        // fallback to mailto
        tryMailToFallback();
        setStatus({ type: 'success', message: t('contactReply') || 'Message prepared in your mail client.' });
      }
    } catch (err) {
      // network error -> mailto fallback
      tryMailToFallback();
      setStatus({ type: 'success', message: t('contactReply') || 'Message prepared in your mail client.' });
    } finally {
      setLoading(false);
    }
  };

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
          {/* Left column: contact details & form */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 dark:text-white">
              <HiOutlineLocationMarker size={32} className="text-[#e1ba66]" />
              <div>
                <h3 className="text-2xl font-semibold">{t('Address')}</h3>
                <p className="text-lg">{t('contactAddress')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 dark:text-white">
              <MdEmail size={28} className="text-[#e1ba66]" />
              <div>
                <h3 className="text-2xl font-semibold">{t('contactTitle') || 'Contact'}</h3>
                <a href={`mailto:${t('contactEmail')}`} className="text-blue-400 hover:underline">
                  {t('contactEmail')}
                </a>
              </div>
            </div>

            <p className="text-lg dark:text-white">{t('contactMessage') || 'Feel free to reach out to us for any inquiries or orders.'}</p>

            <form onSubmit={onSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder={t('yourName') || 'Your name'}
                  className="px-3 py-2 rounded-md w-full"
                  required
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder={t('yourEmail') || 'you@example.com'}
                  className="px-3 py-2 rounded-md w-full"
                  type="email"
                  required
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder={t('yourMessage') || 'Message'}
                className="w-full px-3 py-2 rounded-md min-h-[120px]"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-[#e1ba66] text-black font-semibold shadow"
                >
                  {loading ? t('generating') || 'Sending…' : t('getInTouchButton') || 'Send Message'}
                </button>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('hoursReply') || 'Open: 9 AM - 9 PM'}
                </div>
              </div>

              {status && (
                <div className={`mt-2 p-3 rounded ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Map + quick contact actions */}
          <div className="space-y-4">
            <div className="rounded overflow-hidden shadow-lg">
              <iframe
                title="Google Maps - Elite Gems Private Limited"
                src="https://www.google.com/maps?q=34.004689,71.565888&hl=en&z=15&output=embed"
                width="100%"
                height="360"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href={`https://wa.me/+923339134320`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold shadow"
              >
                WhatsApp: {t('contactPhone')}
              </a>
              <a
                href={`mailto:${t('contactEmail')}`}
                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-semibold shadow"
              >
                {t('contactEmail')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
