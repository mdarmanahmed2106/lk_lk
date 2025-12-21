import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { user, logout, isAuthenticated } = useAuth();

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
            {/* Company Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <motion.img
                  src="/images/lk-logo.png"
                  alt="LocalKonnect Logo"
                  className="h-14 w-auto object-contain"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="hidden sm:flex flex-col">
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-lk-text to-lk-teal bg-clip-text text-transparent leading-tight">
                    Local
                  </span>
                  <span className="text-xl font-black tracking-tight text-lk-teal leading-tight -mt-1">
                    Konnect
                  </span>
                </div>
              </motion.div>
            </Link>

            <div className="hidden md:block h-6 w-px bg-gray-200"></div>

            <div className="hidden md:block">
              <LocationSelector />
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Right: Auth & CTA */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              // Logged in state
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-lk-teal/10 rounded-full cursor-pointer hover:bg-lk-teal/20 transition-colors"
                  >
                    <User size={18} className="text-lk-teal" />
                    <span className="text-sm font-semibold text-lk-text hidden sm:inline">
                      {user?.name}
                    </span>
                  </motion.div>
                </Link>

                {/* Admin Dashboard Link - Only show for admins */}
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lk-teal to-lk-mustard text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <LayoutDashboard size={18} />
                      <span className="hidden sm:inline">Dashboard</span>
                    </motion.button>
                  </Link>
                )}

                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            ) : (
              // Logged out state
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 border-2 border-lk-teal text-lk-teal rounded-full font-semibold hover:bg-lk-teal/5 transition-all duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 bg-gradient-to-r from-lk-teal to-lk-mustard text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}

            {/* Become a Partner CTA */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 124, 141, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block bg-gradient-to-r from-lk-teal to-[#156575] text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Become a Partner
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;


