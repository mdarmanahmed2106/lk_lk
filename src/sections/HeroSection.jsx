import React, { useEffect, useRef, useState } from 'react';
import {
  Scissors, Zap, Droplets, Wrench, Car, Calendar,
  Stethoscope, Heart, MapPin, Dumbbell, UtensilsCrossed, Trophy
} from 'lucide-react';
import CategoryTile from '../components/CategoryTile';
import ImageMosaic from '../components/ImageMosaic';
import GlassCard from '../components/ui/GlassCard';
import FloatingStat from '../components/FloatingStat';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const categories = [
  // Active Services
  { icon: Scissors, label: "Salon", comingSoon: false },
  { icon: Trophy, label: "Sports", comingSoon: false },
  { icon: Calendar, label: "Events", comingSoon: false },
  { icon: Car, label: "Car Wash", comingSoon: false },
  { icon: Zap, label: "Electrician", comingSoon: false },
  { icon: Wrench, label: "Plumber", comingSoon: false },
  { icon: Droplets, label: "Cleaning", comingSoon: false },

  // Coming Soon Services
  { icon: Stethoscope, label: "Doctor", comingSoon: true },
  { icon: Heart, label: "Blood Group", comingSoon: true },
  { icon: MapPin, label: "Tourist Guide", comingSoon: true },
  { icon: Dumbbell, label: "Gym & Fitness", comingSoon: true },
  { icon: UtensilsCrossed, label: "Food Plan", comingSoon: true },
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

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
    <section ref={containerRef} className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-br from-lk-teal/20 to-lk-mustard/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-lk-mustard/15 to-lk-teal/15 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Left: Enhanced Hero Content */}
          <div className="lg:col-span-5 hero-content space-y-6">
            {/* Hero Title with Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="block text-lk-text">Your lifestyle,</span>
                <span className="block bg-gradient-to-r from-lk-teal via-lk-mustard to-lk-teal bg-clip-text text-transparent">
                  simplified.
                </span>
              </motion.h1>

              <motion.p
                className="text-gray-600 text-base md:text-lg mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                From salon & sports to car care & home services. Everything you need, one platform.
              </motion.p>
            </motion.div>

            {/* Floating Stats */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
              <FloatingStat number="50K+" label="Happy Customers" delay={0.3} />
              <FloatingStat number="500+" label="Verified Pros" delay={0.4} />
              <FloatingStat number="4.9★" label="Average Rating" delay={0.5} />
            </div>

            {/* Category Card */}
            <GlassCard
              className="p-6 md:p-8"
              intensity="medium"
            >
              <h2 className="text-xl md:text-2xl font-bold text-lk-text mb-2">What are you looking for?</h2>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                {activeCategory ? `Selected: ${activeCategory}` : 'Choose a service to get started'}
              </p>

              {/* Enhanced Interactive Grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {categories.map((cat, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => !cat.comingSoon && setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                    whileHover={!cat.comingSoon ? { scale: 1.05, rotate: 2 } : {}}
                    whileTap={!cat.comingSoon ? { scale: 0.95 } : {}}
                    animate={{
                      backgroundColor: activeCategory === cat.label ? '#1D7C8D' : '#FFFFFF'
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative p-3 md:p-4 rounded-xl shadow-md group overflow-hidden",
                      cat.comingSoon && "opacity-60 cursor-not-allowed"
                    )}
                    disabled={cat.comingSoon}
                  >
                    {/* Coming Soon Badge */}
                    {cat.comingSoon && (
                      <div className="absolute top-1 right-1 bg-lk-mustard text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-full z-20">
                        Soon
                      </div>
                    )}

                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-lk-teal/20 to-lk-mustard/20"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: cat.comingSoon ? 0 : 1, scale: cat.comingSoon ? 0 : 1.5 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        animate={{
                          rotate: activeCategory === cat.label ? 360 : 0,
                          color: activeCategory === cat.label ? '#FFFFFF' : '#1C1C1C'
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-2"
                      >
                        <cat.icon size={24} strokeWidth={1.5} />
                      </motion.div>
                      <span className={cn(
                        "text-[11px] md:text-xs font-medium text-center leading-tight",
                        activeCategory === cat.label ? "text-white" : "text-lk-text"
                      )}>
                        {cat.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right: Image Mosaic */}
          <div className="lg:col-span-7 h-full hidden md:block">
            <ImageMosaic />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

