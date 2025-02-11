// src/pages/index.tsx
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingChatButton from '../components/FloatingChatButton';
import GallerySection from '../components/GallerySection';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Elite Gems - Exquisite Gemstone Jewelry & Manufacturing</title>
        <meta name="description" content="Elite Gems offers exquisite gemstone jewelry and precision manufacturing services in Peshawar, Pakistan." />
      </Head>
      <Header />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <GallerySection/>
        <ContactSection />
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
}
