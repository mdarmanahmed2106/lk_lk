import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Search, Loader2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CITIES = [
  'Mumbai, India',
  'Delhi, India',
  'Bangalore, India',
  'Hyderabad, India',
  'Chennai, India',
  'Kolkata, India',
  'Pune, India',
  'Ahmedabad, India',
  'Jaipur, India',
  'Lucknow, India'
];

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(() => {
    // Load from localStorage if available
    return localStorage.getItem('userLocation') || 'Mumbai, India';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userLocation', location);
  }, [location]);

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsOpen(false);
    setSearchQuery('');
    toast.success(`Location set to ${selectedLocation}`);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Using reverse geocoding with OpenStreetMap Nominatim API
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const city = data.address.city || data.address.town || data.address.village || 'Unknown';
          const country = data.address.country || 'India';
          const detectedLocation = `${city}, ${country}`;

          setLocation(detectedLocation);
          setIsOpen(false);
          setSearchQuery('');
          toast.success(`Location detected: ${detectedLocation}`);
        } catch (error) {
          console.error('Error getting location:', error);
          toast.error('Failed to detect location');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('Location permission denied');
        } else {
          toast.error('Failed to get your location');
        }
      }
    );
  };

  return (
    <div className="relative z-50">
      <button
        className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin size={18} className="text-lk-teal group-hover:scale-110 transition-transform" />
        <span className="font-medium text-sm text-lk-text max-w-[150px] truncate">{location}</span>
        <ChevronDown
          size={16}
          className={`text-lk-text-light transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-lk-teal/5 to-lk-mustard/5 border-b border-gray-100">
                <h3 className="text-sm font-bold text-lk-text mb-1">Select Your Location</h3>
                <p className="text-xs text-gray-500">Choose a city to see available services</p>
              </div>

              {/* Search Bar */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lk-teal/20 focus:border-lk-teal transition-all"
                  />
                </div>
              </div>

              {/* City List */}
              <div className="max-h-64 overflow-y-auto p-2">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <motion.button
                      key={city}
                      whileHover={{ x: 4 }}
                      onClick={() => handleLocationSelect(city)}
                      className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all flex items-center justify-between group ${location === city
                        ? 'bg-lk-teal text-white font-medium'
                        : 'text-lk-text hover:bg-gray-50'
                        }`}
                    >
                      <span>{city}</span>
                      {location === city && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    No cities found matching "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Use Current Location */}
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={isLoadingLocation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-lk-teal to-lk-mustard text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingLocation ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Detecting Location...</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={16} />
                      <span>Use Current Location</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
