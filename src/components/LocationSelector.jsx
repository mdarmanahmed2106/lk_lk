import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('Mumbai, India');

  return (
    <div className="relative z-50">
      <button
        className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin size={18} className="text-lk-text-light" />
        <span className="font-medium text-sm text-lk-text">{location}</span>
        <ChevronDown size={16} className={`text-lk-text-light transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-float border border-gray-100 p-2 overflow-hidden"
          >
            <div className="p-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Select Location</div>
            {['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Hyderabad, India', 'Chennai, India', 'Kolkata, India', 'Pune, India'].map((loc) => (
              <button
                key={loc}
                className="w-full text-left px-3 py-2 text-sm text-lk-text hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => {
                  setLocation(loc);
                  setIsOpen(false);
                }}
              >
                {loc}
              </button>
            ))}
            <div className="border-t border-gray-100 my-1"></div>
            <button className="w-full text-left px-3 py-2 text-sm text-lk-teal font-medium hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2">
              <MapPin size={14} />
              Use Current Location
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
