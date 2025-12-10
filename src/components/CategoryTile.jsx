import React from 'react';
import { motion } from 'framer-motion';

const CategoryTile = ({ icon: Icon, label, onClick }) => {
  return (
    <motion.button
      whileHover={{
        y: -8,
        rotate: 2,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.95, rotate: -2 }}
      className="relative group"
      onClick={onClick}
    >
      {/* Animated gradient border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-lk-teal to-lk-mustard opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity duration-300" />

      {/* Card content */}
      <div className="relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-white border border-gray-100 transition-all duration-200">
        {/* Icon with wiggle animation on hover */}
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
          }}
          className="mb-2 text-lk-text"
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.div>

        {/* Label */}
        <span className="text-[11px] md:text-xs font-medium text-center text-lk-text leading-tight">
          {label}
        </span>
      </div>
    </motion.button>
  );
};

export default CategoryTile;
