import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const SportsPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('sports');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/sports-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sports services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const sportsData = {
        title: "Sports & Fitness",
        description: "Access to premium sports facilities and professional coaching. Stay fit and active with our services.",
        heroImage: "/images/sports-hero.png",
        benefits: [
            "Certified coaches and trainers",
            "Modern sports facilities",
            "Flexible membership plans",
            "Group and individual sessions",
            "All age groups welcome"
        ],
        services: services,
        bookingLink: "/sports/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...sportsData} />;
};

export default SportsPage;
