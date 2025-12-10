import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      layout
      className={`relative flex items-center bg-lk-grey-soft rounded-lg transition-all duration-300 ${isFocused ? 'ring-1 ring-gray-200 bg-white shadow-sm w-[400px]' : 'w-[300px]'}`}
    >
      <div className="pl-3 text-lk-text-light">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search for 'AC Repair'"
        className="w-full bg-transparent border-none focus:ring-0 text-sm px-3 py-2.5 text-lk-text placeholder:text-gray-400"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  );
};

export default SearchBar;
