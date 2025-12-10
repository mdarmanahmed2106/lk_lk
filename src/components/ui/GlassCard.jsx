import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const GlassCard = ({ 
  children, 
  className,
  animate = true,
  hover = true,
  intensity = 'medium' // 'light', 'medium', 'strong'
}) => {
  const intensityClasses = {
    light: 'backdrop-blur-sm bg-white/50 border-white/10',
    medium: 'backdrop-blur-lg bg-white/70 border-white/20',
    strong: 'backdrop-blur-xl bg-white/80 border-white/30'
  };

  const baseClasses = cn(
    intensityClasses[intensity],
    "shadow-xl rounded-3xl p-6",
    "border transition-all duration-300",
    hover && "hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02]",
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={baseClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default GlassCard;
