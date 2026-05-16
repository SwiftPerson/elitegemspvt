import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

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
    window.location.href = `mailto:khalidminarals@gmail.com?subject=${subject}&body=${body}`;
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: t('contactReply') || 'Thanks — we received your message!' });
        setForm(initialForm);
      } else {
        tryMailToFallback();
        setStatus({ type: 'success', message: t('contactReply') || 'Message prepared in your mail client.' });
      }
    } catch (err) {
      tryMailToFallback();
      setStatus({ type: 'success', message: t('contactReply') || 'Message prepared in your mail client.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gem-dark overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 gold-gradient-text">
            {t('contactTitle')}
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact Info + Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/20 flex-shrink-0">
                  <HiOutlineLocationMarker className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-adaptive-primary mb-1">{t('Address')}</h4>
                  <p className="text-xs text-adaptive-secondary leading-relaxed">{t('contactAddress')}</p>
                </div>
              </div>
              <div className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/20 flex-shrink-0">
                  <MdEmail className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-adaptive-primary mb-1">Email</h4>
                  <a href={`mailto:${t('contactEmail')}`} className="text-xs text-gold hover:text-gold-light transition-colors">
                    {t('contactEmail')}
                  </a>
                </div>
              </div>
            </div>

            <p className="text-adaptive-secondary text-sm leading-relaxed">
              {t('contactMessage') || 'Feel free to reach out to us for any inquiries or orders.'}
            </p>

            {/* Form */}
            <form onSubmit={onSubmit} className="glass-card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder={t('yourName') || 'Your name'}
                  className="w-full px-4 py-3 rounded-xl bg-adaptive-card border border-adaptive-border text-adaptive-primary text-sm placeholder-adaptive-secondary/50 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
                  required
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder={t('yourEmail') || 'you@example.com'}
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-adaptive-card border border-adaptive-border text-adaptive-primary text-sm placeholder-adaptive-secondary/50 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
                  required
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder={t('yourMessage') || 'Message'}
                className="w-full px-4 py-3 rounded-xl bg-adaptive-card border border-adaptive-border text-adaptive-primary text-sm placeholder-adaptive-secondary/50 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all min-h-[130px] resize-none"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold text-sm disabled:opacity-50"
                >
                  {loading ? t('generating') || 'Sending…' : t('getInTouchButton') || 'Send Message'}
                </button>
                <span className="text-xs text-adaptive-secondary/60">{t('hoursReply') || 'Open: 9 AM - 9 PM'}</span>
              </div>

              {status && (
                <div className={`mt-2 p-3 rounded-xl text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-gem/10 text-emerald-gem border border-emerald-gem/20'
                    : 'bg-ruby-gem/10 text-ruby-gem border border-ruby-gem/20'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </motion.div>

          {/* Right: Map + Actions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-glass">
              <iframe
                title="Google Maps - Elite Gems Private Limited"
                src="https://www.google.com/maps?q=34.004689,71.565888&hl=en&z=15&output=embed"
                width="100%"
                height="380"
                className="border-0 grayscale contrast-[1.1] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 gap-3">
              <a
                href="https://wa.me/+923339134320"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 px-6 py-4 rounded-xl glass-card-hover border border-white/[0.06] hover:border-emerald-gem/30 group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-gem/10 border border-emerald-gem/20">
                  <FaWhatsapp className="text-emerald-gem" size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-adaptive-primary group-hover:text-emerald-gem transition-colors">WhatsApp</div>
                  <div className="text-xs text-adaptive-secondary">{t('contactPhone')}</div>
                </div>
              </a>
              <a
                href={`mailto:${t('contactEmail')}`}
                className="flex items-center gap-4 px-6 py-4 rounded-xl glass-card-hover border border-white/[0.06] hover:border-gold/30 group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/20">
                  <MdEmail className="text-gold" size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-adaptive-primary group-hover:text-gold transition-colors">Email</div>
                  <div className="text-xs text-adaptive-secondary">{t('contactEmail')}</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
