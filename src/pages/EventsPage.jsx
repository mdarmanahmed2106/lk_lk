import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServicePage from './ServicePage';

const EventsPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getByCategory('events');
                const serviceData = response.data.data.map(service => ({
                    title: service.name,
                    rating: service.rating?.toString() || "4.8",
                    reviews: service.reviews ? `${(service.reviews / 1000).toFixed(1)}k` : "1k",
                    price: service.price.toString(),
                    discount: service.discount || "",
                    image: service.image || "/images/events-hero.png"
                }));
                setServices(serviceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event tickets:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const eventsData = {
        title: "Event Tickets",
        description: "Book tickets for concerts, sports events, festivals, and theater shows. Never miss out on the action!",
        heroImage: "/images/events-hero.png",
        benefits: [
            "Verified and authentic tickets",
            "Secure online booking",
            "Instant confirmation",
            "Best seat selection",
            "Easy cancellation policy"
        ],
        services: services,
        bookingLink: "/events/book"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lk-teal"></div>
            </div>
        );
    }

    return <ServicePage {...eventsData} />;
};

export default EventsPage;
