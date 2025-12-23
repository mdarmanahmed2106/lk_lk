import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';
import SkeletonCard from '../components/ui/SkeletonCard';
import { serviceAPI } from '../services/api';

const MostBookedSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostBookedServices = async () => {
      try {
        // Fetch specific popular services from different categories in parallel
        const categories = ['cleaning', 'salon', 'electrician'];

        // Fetch all categories simultaneously for better performance
        const responses = await Promise.all(
          categories.map(category => serviceAPI.getByCategory(category))
        );

        // Collect services from all successful responses
        const allServices = responses.flatMap(response => {
          if (response.data.data && response.data.data.length > 0) {
            // Get first 2 services from each category
            return response.data.data.slice(0, 2);
          }
          return [];
        });

        // Format the services for ServiceCard
        const formattedServices = allServices.slice(0, 5).map(service => ({
          title: service.name,
          rating: service.rating?.toString() || "4.8",
          reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
          price: service.price.toString(),
          discount: service.discount || null,
          image: service.image || "/images/placeholder.png",
          serviceType: service.category
        }));

        setServices(formattedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching most booked services:', error);
        // Fallback to empty array if API fails
        setServices([]);
        setLoading(false);
      }
    };

    fetchMostBookedServices();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-64 mb-2" />
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
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
