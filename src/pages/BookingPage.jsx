import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingPage = ({
    serviceName,
    serviceImage,
    basePrice = "0",
    serviceOptions = [],
    backLink = "/"
}) => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        date: '',
        time: '',
        address: '',
        selectedOption: serviceOptions[0]?.name || '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const selectedOptionData = serviceOptions.find(opt => opt.name === formData.selectedOption);
            const totalPrice = selectedOptionData?.price || basePrice;

            // Map service name to correct enum value
            // Remove " Services" or " & Detailing" etc. and convert to lowercase with hyphens
            let serviceType = serviceName
                .replace(/\s+Services$/i, '')
                .replace(/\s+&\s+Detailing$/i, '')
                .replace(/\s+&\s+Fitness$/i, '')
                .replace(/\s+Tickets$/i, '')
                .toLowerCase()
                .replace(/\s+/g, '-');

            const bookingData = {
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                serviceType: serviceType,
                serviceOption: formData.selectedOption,
                date: formData.date,
                time: formData.time,
                address: formData.address,
                notes: formData.notes,
                totalPrice: parseFloat(totalPrice)
            };

            console.log('📤 Sending booking data:', bookingData);

            const response = await bookingAPI.create(bookingData);

            console.log('✅ Booking created successfully:', response.data);

            // Success - redirect to profile or show success message
            toast.success('Booking confirmed! We will contact you shortly.');

            // Wait a bit before redirecting so user sees the toast
            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/profile');
                } else {
                    navigate('/');
                }
            }, 1500);
        } catch (error) {
            console.error('❌ Booking error:', error);
            console.error('Error response:', error.response?.data);
            setError(error.response?.data?.message || 'Failed to create booking. Please try again.');
            toast.error(error.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const selectedOptionData = serviceOptions.find(opt => opt.name === formData.selectedOption);
    const totalPrice = selectedOptionData?.price || basePrice;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Back button */}
                <Link
                    to={backLink}
                    className="inline-flex items-center gap-2 text-lk-teal hover:text-lk-mustard transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to {serviceName}</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent">
                        Book {serviceName}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Fill in your details and we'll get back to you shortly
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 md:p-8" intensity="medium">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-xl font-bold text-lk-text mb-4">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <User size={16} className="inline mr-2" />
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Phone size={16} className="inline mr-2" />
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail size={16} className="inline mr-2" />
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div>
                                    <h3 className="text-xl font-bold text-lk-text mb-4">Service Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {serviceOptions.length > 0 && (
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Select Service *
                                                </label>
                                                <select
                                                    name="selectedOption"
                                                    value={formData.selectedOption}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                                >
                                                    {serviceOptions.map((option, idx) => (
                                                        <option key={idx} value={option.name}>
                                                            {option.name} - ${option.price}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Calendar size={16} className="inline mr-2" />
                                                Preferred Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Clock size={16} className="inline mr-2" />
                                                Preferred Time *
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MapPin size={16} className="inline mr-2" />
                                                Service Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all resize-none"
                                                placeholder="Enter your complete address"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none transition-all resize-none"
                                        placeholder="Any special requirements or preferences..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-lk-teal to-lk-mustard text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </form>
                        </GlassCard>
                    </div>

                    {/* Booking Summary */}
                    <div className="lg:col-span-1">
                        <GlassCard className="p-6 sticky top-24" intensity="medium">
                            <h3 className="text-xl font-bold text-lk-text mb-4">Booking Summary</h3>

                            {/* Service Image */}
                            <img
                                src={serviceImage}
                                alt={serviceName}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            {/* Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600">Service</span>
                                    <span className="font-semibold text-lk-text">{serviceName}</span>
                                </div>

                                {formData.selectedOption && (
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-gray-600">Selected</span>
                                        <span className="font-semibold text-lk-text text-sm">{formData.selectedOption}</span>
                                    </div>
                                )}

                                {formData.date && (
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-gray-600">Date</span>
                                        <span className="font-semibold text-lk-text">{new Date(formData.date).toLocaleDateString()}</span>
                                    </div>
                                )}

                                {formData.time && (
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                        <span className="text-gray-600">Time</span>
                                        <span className="font-semibold text-lk-text">{formData.time}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-3">
                                    <span className="text-lg font-bold text-lk-text">Total</span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent">
                                        ${totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-lk-teal/5 rounded-lg p-4">
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <CreditCard size={16} className="mt-0.5 text-lk-teal flex-shrink-0" />
                                    <p>Payment will be collected after service completion. We accept cash, cards, and digital payments.</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
