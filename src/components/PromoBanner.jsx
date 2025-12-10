import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PromoBanner = ({ title, subtitle, buttonText, colorClass, image, className }) => {
  return (
    <motion.div 
      className={cn("relative flex-shrink-0 w-[300px] md:w-[400px] h-[220px] rounded-2xl overflow-hidden p-6 flex flex-col justify-center text-white", colorClass, className)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative z-10 max-w-[60%]">
        <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">{title}</h3>
        <p className="text-white/90 text-sm mb-6 font-medium">{subtitle}</p>
        <button className="bg-white text-lk-text px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 group">
          {buttonText}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="absolute right-0 bottom-0 top-0 w-1/2">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center mask-image-gradient"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 20%)' }}
        />
      </div>
    </motion.div>
  );
};

export default PromoBanner;
