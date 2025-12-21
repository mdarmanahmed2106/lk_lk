import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const SkeletonStats = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <GlassCard className="p-6" intensity="medium">
                        <div className="space-y-3">
                            {/* Header with icon */}
                            <div className="flex items-center justify-between">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-24" />
                                <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
                            </div>

                            {/* Number */}
                            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-16" />

                            {/* Label */}
                            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-20" />
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </>
    );
};

export default SkeletonStats;
