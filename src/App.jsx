import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import PromoSection from './sections/PromoSection';
import MostBookedSection from './sections/MostBookedSection';
import DownloadSection from './sections/DownloadSection';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-lk-text flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <PromoSection />
        <MostBookedSection />
        <DownloadSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
