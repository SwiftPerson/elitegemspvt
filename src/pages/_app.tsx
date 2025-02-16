import type { AppProps } from 'next/app';
import Head from 'next/head'; // Import Head component
import { ThemeProvider } from '../context/ThemeContext';
import Preloader from '../components/Preloader';
import '../styles/globals.css';
import '../lib/i18n';
import ChatBot from '../components/ChatBot';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     <Head>
     <link rel="icon" href="/favicon.ico" />
  <title>Elite Gems Private Limited | Premium Gemstones Worldwide</title>
  <meta 
    name="description" 
    content="Elite Gems Private Limited: Trusted global exporter of authentic  gemstones like Emeralds, Rubies, Sapphires & Topaz. Certified quality, ethical sourcing, and worldwide shipping." 
  />

  <meta property="og:title" content="Elite Gems Private Limited | Premium Gemstones Worldwide" />
  <meta property="og:image" content="/og-global-gemstones.jpg" />

</Head>
      
      <ThemeProvider>
        <Component {...pageProps} />
        <ChatBot />
        <Preloader />
      </ThemeProvider>
    </>
  );
}

export default MyApp;