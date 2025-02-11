import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChatButton from '../components/FloatingChatButton';
import { useTranslation } from 'react-i18next';

const About: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('aboutTitle')}</title>
      </Head>
      <Header />
      <section className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('aboutTitle')}</h2>
        <p className="text-lg leading-relaxed">
          {t('aboutContent')}
        </p>
      </section>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default About;
