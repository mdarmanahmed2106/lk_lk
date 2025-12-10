import React from 'react';
import { motion } from 'framer-motion';

const FloatingStat = ({ number, label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-shadow"
    >
        <div className="text-2xl md:text-3xl font-bold text-lk-teal">{number}</div>
        <div className="text-xs md:text-sm text-gray-600 font-medium">{label}</div>
    </motion.div>
);

export default FloatingStat;
