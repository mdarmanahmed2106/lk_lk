import React from 'react';
import { motion } from 'framer-motion';

const SkeletonTable = ({ rows = 5, columns = 6 }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        {Array.from({ length: columns }).map((_, idx) => (
                            <th key={idx} className="text-left py-3 px-4">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-20" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <motion.tr
                            key={rowIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: rowIdx * 0.05 }}
                            className="border-b border-gray-100"
                        >
                            {Array.from({ length: columns }).map((_, colIdx) => (
                                <td key={colIdx} className="py-4 px-4">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-full" />
                                        {colIdx === 0 && (
                                            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-3/4" />
                                        )}
                                    </div>
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkeletonTable;
