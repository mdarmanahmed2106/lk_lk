import React from 'react';
import { motion } from 'framer-motion';

const StoreButton = ({ store, icon, title, subtitle }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-3 bg-black text-white px-4 py-2.5 rounded-lg shadow-md hover:bg-gray-800 transition-colors min-w-[160px]"
  >
    <div className="w-6 h-6 fill-current">
      {icon}
    </div>
    <div className="text-left flex flex-col leading-none">
      <span className="text-[10px] uppercase font-medium opacity-80">{subtitle}</span>
      <span className="text-sm font-bold tracking-wide">{title}</span>
    </div>
  </motion.button>
);

const AppleIcon = (
  <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.9c14.2 40.2 40.8 90.4 71.2 90.4 21.2 0 26.7-13.1 58.3-13.1 32 0 35.9 13.1 57.9 13.1 28 0 51.6-43.2 71.7-89.9 13.4-30.8 19.3-60.6 19.3-60.6-1.7-.8-58-22.7-58.1-64.6M249.9 74.9c17.2-21.8 31.2-49.9 28-80.6-26.3 3.3-50.6 15.2-66.2 34.1-14.7 17.6-27.3 49.3-24.6 79 27.6 2.1 48.1-12.2 62.8-32.5" />
  </svg>
);

const PlayStoreIcon = (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

const DownloadSection = () => {
  return (
    <section className="py-16 md:py-24 bg-lk-grey-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lk-text mb-4">
                Experience easier living with the <span className="text-lk-teal">Local Konnect App</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                Book services, track professionals in real-time, and get exclusive app-only offers. Available for iOS and Android.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <StoreButton
                  icon={AppleIcon}
                  subtitle="Download on the"
                  title="App Store"
                />
                <StoreButton
                  icon={PlayStoreIcon}
                  subtitle="Get it on"
                  title="Google Play"
                />
              </div>
            </motion.div>
          </div>

          {/* Image/Mockup Area */}
          <div className="flex-1 relative w-full max-w-md md:max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Abstract Phone Mockup Shapes */}
              <div className="relative z-10 mx-auto w-[260px] h-[500px] bg-white rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-b-xl w-32 mx-auto z-20"></div>
                <img
                  src="/images/app-screenshot.png"
                  alt="App Screen"
                  className="w-full h-full object-cover"
                />
                {/* Floating UI Element */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="text-sm font-bold text-lk-text">Professional Arrived</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-lk-teal/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-lk-mustard/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
