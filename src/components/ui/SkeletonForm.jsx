import React from 'react';
import { motion } from 'framer-motion';

const SkeletonForm = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Section 1 */}
            <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-48" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-24" />
                            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-40" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-28" />
                            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-32" />
                <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded" />
            </div>

            {/* Button */}
            <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-xl" />
        </motion.div>
    );
};

export default SkeletonForm;
