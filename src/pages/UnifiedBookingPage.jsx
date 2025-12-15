import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BookingPage from './BookingPage';
import { serviceConfigs } from '../config/serviceConfig';

const UnifiedBookingPage = () => {
    const { service } = useParams();

    // Get the service configuration
    const config = serviceConfigs[service];

    // If service doesn't exist, redirect to home
    if (!config) {
        return <Navigate to="/" replace />;
    }

    return <BookingPage {...config} />;
};

export default UnifiedBookingPage;
