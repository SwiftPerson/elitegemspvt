import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChatButton from '../components/FloatingChatButton';
import { useTranslation } from 'react-i18next';

const Contact: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('contactTitle')}</title>
      </Head>
      <Header />
      <section className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('contactTitle')}</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            {/* Replace YOUR_EMBED_CODE with your actual Google Maps embed code */}
            <iframe
              title="Google Maps - Elite Gems Private Limited"
              src="https://www.google.com/maps?q=34.004689,71.565888&hl=en&z=15&output=embed"
              width="100%"
              height="300"
              className="border-0 rounded"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="mb-4">{t('contactAddress')}</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:elitegems@protonmail.com"
                  className="text-blue-600 hover:underline"
                >
                  elitegems@protonmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Contact;
