import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const CleaningPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('cleaning');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/cleaning-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cleaning services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const cleaningData = {
        title: "Cleaning Services",
        description: "Professional home and office cleaning services. Our trained staff ensures your space is spotless and hygienic.",
        heroImage: "/images/cleaning-hero.png",
        benefits: [
            "Eco-friendly cleaning products",
            "Background-verified staff",
            "Flexible scheduling options",
            "100% satisfaction guarantee",
            "Affordable and transparent pricing"
        ],
        services: services,
        bookingLink: "/cleaning/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...cleaningData} />;
};

export default CleaningPage;
