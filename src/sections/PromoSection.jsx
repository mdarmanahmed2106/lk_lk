import React, { useRef } from 'react';
import PromoBanner from '../components/PromoBanner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const promos = [
  {
    title: "Home Cleaning Special",
    subtitle: "Get up to 40% off on deep cleaning",
    buttonText: "Book Now",
    colorClass: "bg-[#1D7C8D]", // LK Teal
    image: "https://images.unsplash.com/photo-1581578731117-104f8a746950?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Salon at Home",
    subtitle: "Premium spa therapies starting @ $29",
    buttonText: "View Offers",
    colorClass: "bg-[#7C3AED]", // Purple
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Appliance Repair",
    subtitle: "Zero visiting charges this week",
    buttonText: "Book Repair",
    colorClass: "bg-[#D4A05A]", // LK Mustard
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Painting Services",
    subtitle: "Refresh your walls for the season",
    buttonText: "Get Quote",
    colorClass: "bg-[#059669]", // Emerald
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
  }
];

const PromoSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 420;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-lk-text">Offers for you</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-lk-text transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-lk-text transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
          >
            {promos.map((promo, idx) => (
              <div key={idx} className="snap-start">
                <PromoBanner {...promo} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PromoSection;
