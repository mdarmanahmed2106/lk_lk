import React from 'react';
import { motion } from 'framer-motion';

const StoreButton = ({ href, icon, title, subtitle }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-colors min-w-[180px]"
  >
    <div className="w-7 h-7 fill-current">
      {icon}
    </div>
    <div className="text-left flex flex-col leading-none">
      <span className="text-[10px] uppercase font-medium opacity-80">{subtitle}</span>
      <span className="text-base font-bold tracking-wide">{title}</span>
    </div>
  </motion.a>
);

const AppleIcon = (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-full h-full"
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PlayStoreIcon = (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

const DownloadSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
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
                  href="https://apps.apple.com/in/app/local-konnect/id6751973368"
                  icon={AppleIcon}
                  subtitle="Download on the"
                  title="App Store"
                />
                <StoreButton
                  href="https://play.google.com/store/apps/details?id=com.localkonnect.customer&hl=en_IN"
                  icon={PlayStoreIcon}
                  subtitle="Get it on"
                  title="Google Play"
                />
              </div>
            </motion.div>
          </div>

          {/* Phone Mockup */}
          <div className="flex-1 relative w-full max-w-md md:max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Phone Mockup */}
              <div className="relative z-10 mx-auto w-[260px] h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>

                {/* Screen Content - Gradient Background */}
                <div className="w-full h-full bg-gradient-to-br from-lk-teal via-lk-teal/90 to-lk-mustard p-6 flex flex-col justify-center items-center">
                  <div className="text-center text-white space-y-4">
                    {/* Local Konnect Logo */}
                    <img
                      src="/images/lk-logo.png"
                      alt="Local Konnect Logo"
                      className="w-20 h-20 mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-2xl font-bold">LocalKonnect</h3>
                    <p className="text-sm opacity-90">Your Service Partner</p>
                  </div>
                </div>

                {/* Floating UI Element */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-8 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100"
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
