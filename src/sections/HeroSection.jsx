import React, { useEffect, useRef } from 'react';
import { Scissors, Zap, Droplets, Wrench, Home, Truck, Smartphone } from 'lucide-react';
import CategoryTile from '../components/CategoryTile';
import ImageMosaic from '../components/ImageMosaic';
import gsap from 'gsap';

const categories = [
  { icon: Scissors, label: "Women's Salon" },
  { icon: Scissors, label: "Men's Salon" },
  { icon: Droplets, label: "Cleaning" },
  { icon: Zap, label: "Electrician" },
  { icon: Wrench, label: "Plumber" },
  { icon: Home, label: "Painting" },
  { icon: Smartphone, label: "Appliance" },
  { icon: Truck, label: "Movers" },
  { icon: Home, label: "Smart Home" },
];

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left: Category Card */}
        <div className="lg:col-span-5 hero-content">
          <div className="bg-white rounded-3xl shadow-float border border-gray-100 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-lk-text mb-2">Home services, on demand.</h1>
            <p className="text-gray-500 mb-8 text-sm md:text-base">What are you looking for today?</p>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {categories.map((cat, idx) => (
                <CategoryTile 
                  key={idx} 
                  icon={cat.icon} 
                  label={cat.label} 
                  onClick={() => console.log(`Clicked ${cat.label}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image Mosaic */}
        <div className="lg:col-span-7 h-full hidden md:block">
          <ImageMosaic />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
