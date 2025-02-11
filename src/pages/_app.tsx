import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import Preloader from '../components/Preloader';
import '../styles/globals.css';
import '../lib/i18n';
import ChatBot from '../components/ChatBot';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ChatBot />
      <Preloader />


    </ThemeProvider>
  );
}

export default MyApp;
