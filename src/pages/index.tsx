import Head from 'next/head'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ProductsSection from '../components/ProductsSection'
import GallerySection from '../components/GallerySection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import FloatingChatButton from '../components/FloatingChatButton'

export default function Home() {
  return (
    <div className="bg-gem-dark min-h-screen">
      <Head>
        <title>Elite Gems — Exquisite Gemstones & Craftsmanship</title>
        <meta name="description" content="Elite Gems — premium gemstones, custom manufacturing and wholesale exports from Peshawar." />
      </Head>

      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  )
}
