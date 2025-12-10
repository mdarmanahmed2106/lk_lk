import React from 'react';
import { motion } from 'framer-motion';

const CategoryTile = ({ icon: Icon, label, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-3 rounded-xl bg-lk-grey-soft hover:bg-white transition-colors duration-200 border border-transparent hover:border-gray-100"
      onClick={onClick}
    >
      <div className="mb-2 text-lk-text">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <span className="text-[11px] md:text-xs font-medium text-center text-lk-text leading-tight">
        {label}
      </span>
    </motion.button>
  );
};

export default CategoryTile;
