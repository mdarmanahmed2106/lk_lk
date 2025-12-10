import React, { useState, useEffect } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient backdrop with blur */}
      <div className={`absolute inset-0 bg-gradient-to-b from-white via-white/95 to-transparent backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Left: Logo & Location */}
          <div className="flex items-center gap-8">
            {/* Animated Logo */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-black tracking-tight flex items-center gap-1"
            >
              <span className="bg-gradient-to-r from-lk-text to-lk-teal bg-clip-text text-transparent">
                Local
              </span>
              <span className="text-lk-teal">Konnect</span>
            </motion.a>

            <div className="hidden md:block h-6 w-px bg-gray-200"></div>

            <div className="hidden md:block">
              <LocationSelector />
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Right: Actions & CTA */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative text-lk-text hover:text-lk-teal transition-colors"
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-lk-mustard text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </motion.button>

            {/* User Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-lk-text hover:text-lk-teal transition-colors hidden sm:block"
            >
              <User size={22} strokeWidth={1.5} />
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 124, 141, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block bg-gradient-to-r from-lk-teal to-[#156575] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Become a Pro
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

