import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-3/4" />

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-16" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-12" />
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-20" />
                    <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-24" />
                </div>
            </div>
        </motion.div>
    );
};

export default SkeletonCard;
