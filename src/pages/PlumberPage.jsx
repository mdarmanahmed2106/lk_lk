import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const PlumberPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('plumber');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/plumber-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plumber services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const plumberData = {
        title: "Plumber Services",
        description: "Professional plumbing services for all your needs. From leak repairs to complete installations.",
        heroImage: "/images/plumber-hero.png",
        benefits: [
            "Experienced plumbing professionals",
            "Quick response time",
            "Quality parts and materials",
            "Transparent pricing",
            "Clean and efficient work"
        ],
        services: services,
        bookingLink: "/plumber/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...plumberData} />;
};

export default PlumberPage;
