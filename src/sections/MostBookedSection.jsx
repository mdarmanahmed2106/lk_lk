import React from 'react';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';

const services = [
  {
    title: "Intense Bathroom Cleaning",
    rating: "4.8",
    reviews: "12k",
    price: "19",
    discount: "15%",
    image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Classic Haircut & Beard Trim",
    rating: "4.9",
    reviews: "8.5k",
    price: "25",
    discount: "10%",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Split AC Service",
    rating: "4.7",
    reviews: "22k",
    price: "15",
    discount: null,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sofa Deep Cleaning",
    rating: "4.8",
    reviews: "5k",
    price: "35",
    discount: "20%",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Full Body Massage (60 min)",
    rating: "4.9",
    reviews: "3k",
    price: "49",
    discount: "25%",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
  }
];

const MostBookedSection = () => {
  return (
    <section className="py-12 bg-lk-grey-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-lk-text mb-2">Most Booked Services</h2>
          <p className="text-gray-500 mb-8">Premium services booked by thousands of customers</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
            {services.map((service, idx) => (
              <div key={idx} className="snap-start">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MostBookedSection;
