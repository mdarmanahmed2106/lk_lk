import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const ScrollReveal = ({ children, className, delay = 0, width = "100%" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
