import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const CarWashPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('car-wash');
                const serviceImages = {
                    "Car Wash & Detailing": "/images/car-wash-detailing.png",
                    "Interior Cleaning": "/images/car-wash-interior.png",
                    "Ceramic Coating": "/images/car-wash-ceramic.png",
                    "Paint Protection": "/images/car-wash-paint.png"
                };

                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: serviceImages[service.name] || service.image || "/images/car-wash-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car wash services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const carWashData = {
        title: "Car Wash & Detailing",
        description: "Premium car care services at your doorstep. From basic wash to complete detailing.",
        heroImage: "/images/car-wash-hero.png",
        benefits: [
            "Professional car care specialists",
            "Eco-friendly products",
            "Doorstep service available",
            "Scratch-free guarantee",
            "Affordable packages"
        ],
        services: services,
        bookingLink: "/car-wash/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...carWashData} serviceType="car-wash" />;
};

export default CarWashPage;
