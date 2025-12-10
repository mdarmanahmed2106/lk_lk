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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b ${isScrolled ? 'border-gray-200 shadow-sm py-2' : 'border-transparent py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-lk-text">Local</span>
            <span className="text-lk-teal">Konnect</span>
          </a>
          
          <div className="hidden md:block h-6 w-px bg-gray-200"></div>
          
          <div className="hidden md:block">
            <LocationSelector />
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="relative text-lk-text hover:text-lk-teal transition-colors"
          >
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-lk-mustard text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="text-lk-text hover:text-lk-teal transition-colors"
          >
            <User size={22} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
