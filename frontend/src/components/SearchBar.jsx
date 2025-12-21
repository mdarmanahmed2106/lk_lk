import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { serviceConfigs } from '../config/serviceConfig';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Flatten services for searching
  const searchableServices = useMemo(() => {
    const services = [];
    Object.entries(serviceConfigs).forEach(([category, config]) => {
      config.serviceOptions.forEach(option => {
        services.push({
          name: option.name,
          price: option.price,
          category: config.serviceName,
          path: `${config.backLink}/book`, // Navigates to booking page for that category
          serviceName: option.name // To pre-select in booking if possible
        });
      });
    });
    return services;
  }, []);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return searchableServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
    ).slice(0, 5); // Limit to 5 results
  }, [query, searchableServices]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (service) => {
    // Navigate to booking page with service pre-selection logic if needed
    // For now, simple navigation to the category's booking page
    // You might want to pass state to pre-select the service
    navigate(service.path, { state: { selectedService: service.name } });
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative z-50" ref={searchRef}>
      <motion.div
        layout
        className={`relative flex items-center bg-lk-grey-soft rounded-lg transition-all duration-300 ${isFocused || showResults ? 'ring-2 ring-lk-teal/20 bg-white shadow-lg w-[400px]' : 'w-[300px]'}`}
      >
        <div className="pl-3 text-lk-text-light">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowResults(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for 'AC Repair', 'Haircut'..."
          className="w-full bg-transparent border-none focus:ring-0 text-sm px-3 py-2.5 text-lk-text placeholder:text-gray-400 outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setQuery('');
            }}
            className="pr-3 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {showResults && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-lk-text group-hover:text-lk-teal transition-colors">
                        {result.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.category}
                      </div>
                    </div>

                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No services found for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
