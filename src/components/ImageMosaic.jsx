import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Service image sets for each position with different services
const serviceImageSets = [
  // Position 1 (tall left) - rotates every 8 seconds
  [
    { src: "/images/womens-salon-hero.png", alt: "Women's Salon", link: "/salon" },
    { src: "/images/mens-haircut.png", alt: "Men's Haircut", link: "/salon" },
    { src: "/images/massage-service.png", alt: "Spa & Massage", link: "/salon" },
  ],
  // Position 2 (top right) - rotates every 10 seconds
  [
    { src: "/images/cleaning-service-hero.png", alt: "Home Cleaning", link: "/cleaning" },
    { src: "/images/bathroom-cleaning.png", alt: "Bathroom Cleaning", link: "/cleaning" },
    { src: "/images/sofa-cleaning.png", alt: "Sofa Cleaning", link: "/cleaning" },
  ],
  // Position 3 (bottom right) - rotates every 12 seconds
  [
    { src: "/images/ac-repair-hero.png", alt: "AC Repair", link: "/electrician" },
    { src: "/images/ac-service.png", alt: "AC Service", link: "/electrician" },
    { src: "/images/car-wash-hero.png", alt: "Car Wash", link: "/car-wash" },
  ]
];

const gridSpans = ["col-span-1 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1"];
const rotationIntervals = [8000, 10000, 12000]; // Different intervals for each position (8s, 10s, 12s)

const ImageMosaic = () => {
  const containerRef = useRef(null);
  const [currentIndices, setCurrentIndices] = useState([0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mosaic-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate images with different intervals for each position
  useEffect(() => {
    const intervals = rotationIntervals.map((interval, positionIdx) => {
      return setInterval(() => {
        setCurrentIndices(prev => {
          const newIndices = [...prev];
          newIndices[positionIdx] = (prev[positionIdx] + 1) % serviceImageSets[positionIdx].length;
          return newIndices;
        });
      }, interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
      {serviceImageSets.map((imageSet, positionIdx) => {
        const currentImage = imageSet[currentIndices[positionIdx]];

        return (
          <motion.div
            key={positionIdx}
            className={`mosaic-item relative overflow-hidden rounded-2xl ${gridSpans[positionIdx]} shadow-md group`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={currentImage.link} className="block w-full h-full">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIndices[positionIdx]}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic-bezier for smooth professional feel
                  }}
                />
              </AnimatePresence>

              {/* Service name label - always visible */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <span className="text-white font-semibold text-sm md:text-lg drop-shadow-lg">
                  {currentImage.alt}
                </span>
              </div>

              {/* Enhanced hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-lk-teal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageMosaic;
