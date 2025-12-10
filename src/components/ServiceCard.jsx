import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ServiceCard = ({ title, rating, reviews, price, image, discount }) => {
  return (
    <motion.div 
      className="flex-shrink-0 w-[240px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <div className="absolute top-3 left-3 bg-lk-teal text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
            {discount} OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="fill-lk-text text-lk-text" />
          <span className="text-xs font-bold text-lk-text">{rating}</span>
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <h3 className="text-sm font-semibold text-lk-text mb-1 line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-500">Starts at ${price}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
