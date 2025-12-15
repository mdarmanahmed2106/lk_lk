import React from 'react';
import HeroSection from '../sections/HeroSection';
import PromoSection from '../sections/PromoSection';
import MostBookedSection from '../sections/MostBookedSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import DownloadSection from '../sections/DownloadSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <MostBookedSection />
      <TestimonialsSection />
      <DownloadSection />
    </>
  );
};

export default HomePage;
