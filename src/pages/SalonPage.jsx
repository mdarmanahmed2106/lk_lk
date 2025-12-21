import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const SalonPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('salon');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/womens-salon-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching salon services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const salonData = {
        title: "Salon Services",
        description: "Professional salon services at your doorstep. From haircuts to spa treatments, our expert stylists bring the salon experience to your home.",
        heroImage: "/images/womens-salon-hero.png",
        benefits: [
            "Certified and experienced professionals",
            "Premium quality products",
            "Flexible scheduling at your convenience",
            "Hygienic and sanitized equipment",
            "Affordable pricing with no hidden costs"
        ],
        services: services,
        bookingLink: "/salon/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...salonData} />;
};

export default SalonPage;
