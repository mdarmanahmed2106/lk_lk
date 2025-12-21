import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const ElectricianPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('electrician');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/electrician-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching electrician services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const electricianData = {
        title: "Electrician Services",
        description: "Expert electrical services for your home and office. From AC installation to complete wiring solutions.",
        heroImage: "/images/electrician-hero.png",
        benefits: [
            "Licensed and certified electricians",
            "24/7 emergency service available",
            "Safety-first approach",
            "Warranty on all work",
            "Competitive pricing"
        ],
        services: services,
        bookingLink: "/electrician/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...electricianData} />;
};

export default ElectricianPage;
