import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/womens-salon-hero.png",
    alt: "Women's Salon",
    span: "col-span-1 row-span-2"
  },
  {
    src: "/images/cleaning-service-hero.png",
    alt: "Cleaning",
    span: "col-span-1 row-span-1"
  },
  {
    src: "/images/ac-repair-hero.png",
    alt: "AC Repair",
    span: "col-span-1 row-span-1"
  }
];

const ImageMosaic = () => {
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className={`mosaic-item relative overflow-hidden rounded-2xl ${img.span} shadow-md group`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageMosaic;
