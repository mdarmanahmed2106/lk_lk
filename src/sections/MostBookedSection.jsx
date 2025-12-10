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
    image: "/images/bathroom-cleaning.png"
  },
  {
    title: "Classic Haircut & Beard Trim",
    rating: "4.9",
    reviews: "8.5k",
    price: "25",
    discount: "10%",
    image: "/images/mens-haircut.png"
  },
  {
    title: "Split AC Service",
    rating: "4.7",
    reviews: "22k",
    price: "15",
    discount: null,
    image: "/images/ac-service.png"
  },
  {
    title: "Sofa Deep Cleaning",
    rating: "4.8",
    reviews: "5k",
    price: "35",
    discount: "20%",
    image: "/images/sofa-cleaning.png"
  },
  {
    title: "Full Body Massage (60 min)",
    rating: "4.9",
    reviews: "3k",
    price: "49",
    discount: "25%",
    image: "/images/massage-service.png"
  }
];

const MostBookedSection = () => {
  return (
    <section className="py-12 bg-lk-grey-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-lk-text mb-2">Most Booked Services</h2>
              <p className="text-gray-600">Popular choices from our customers</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <ServiceCard {...service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostBookedSection;
