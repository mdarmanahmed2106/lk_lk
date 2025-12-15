import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ServiceCard = ({ title, rating, reviews, price, image, discount, serviceType = "salon" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12 }}
      className="relative group cursor-pointer w-full"
    >
      {/* Gradient glow effect on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.75 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 bg-gradient-to-r from-lk-teal to-lk-mustard rounded-2xl blur opacity-0"
      />

      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
        {/* Image with overlay gradient */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <motion.img
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating discount badge */}
          {discount && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute top-3 right-3 bg-lk-coral text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg"
            >
              {discount} OFF
            </motion.div>
          )}

          {/* Quick Action Button (appears on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <Link
              to={`/${serviceType}/book`}
              className="block bg-white text-lk-teal py-2 rounded-lg font-semibold text-sm shadow-lg hover:bg-lk-teal hover:text-white transition-colors text-center"
            >
              Book Now
            </Link>
          </motion.div>
        </div>

        {/* Content - fixed height */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lk-text mb-2 line-clamp-2 min-h-[2.5rem] text-sm leading-tight">{title}</h3>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Star className="fill-amber-400 text-amber-400" size={14} />
                <span className="font-bold text-lk-text text-sm">{rating}</span>
                <span className="text-xs text-gray-400">({reviews})</span>
              </div>
              <div className="text-xl font-bold text-lk-teal">${price}</div>
            </div>
            <p className="text-xs text-gray-500">Starts at ${price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

