import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, CreditCard, Navigation, Loader2, CheckCircle2, Package } from 'lucide-react';
import Lottie from 'lottie-react';
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
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successAnim, setSuccessAnim] = useState(null);
    const [didRedirect, setDidRedirect] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    useEffect(() => {
        // Fetch Lottie JSON from public since Vite disallows direct imports
        fetch('/animations/Success.json')
            .then(res => res.json())
            .then(setSuccessAnim)
            .catch(err => console.error('Failed to load success animation', err));
    }, []);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        date: '',
        time: '',
        address: '',
        selectedOption: location.state?.selectedService || serviceOptions[0]?.name || '',
        notes: '',
        selectedAddressId: '' // For tracking which saved address is selected
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleAddressSelect = (e) => {
        const addressId = e.target.value;
        if (addressId) {
            const selectedAddress = user.addresses.find(addr => addr._id === addressId);
            if (selectedAddress) {
                setFormData({
                    ...formData,
                    address: selectedAddress.addressLine,
                    selectedAddressId: addressId
                });
            }
        } else {
            setFormData({
                ...formData,
                address: '',
                selectedAddressId: ''
            });
        }
    };

    const handleRedirect = () => {
        if (didRedirect) return; // prevent double navigation
        setDidRedirect(true);
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/');
        }
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
            setShowSuccess(true);
            // Fallback redirect if animation fails to load
            if (!successAnim) {
                setTimeout(handleRedirect, 3000);
            }
        } catch (error) {
            console.error('❌ Booking error:', error);
            console.error('Error response:', error.response?.data);
            setError(error.response?.data?.message || 'Failed to create booking. Please try again.');
            toast.error(error.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Using reverse geocoding with OpenStreetMap Nominatim API
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    const city = data.address.city || data.address.town || data.address.village || 'Unknown';
                    const state = data.address.state || '';
                    const country = data.address.country || 'India';
                    const road = data.address.road || '';
                    const suburb = data.address.suburb || '';

                    // Build a detailed address
                    let detectedAddress = '';
                    if (road) detectedAddress += road + ', ';
                    if (suburb) detectedAddress += suburb + ', ';
                    if (city) detectedAddress += city + ', ';
                    if (state) detectedAddress += state + ', ';
                    detectedAddress += country;

                    setFormData({
                        ...formData,
                        address: detectedAddress
                    });
                    toast.success(`Location detected: ${city}, ${country}`);
                } catch (error) {
                    console.error('Error getting location:', error);
                    toast.error('Failed to detect location');
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                setIsLoadingLocation(false);
                if (error.code === error.PERMISSION_DENIED) {
                    toast.error('Location permission denied');
                } else {
                    toast.error('Failed to get your location');
                }
            }
        );
    };

    const selectedOptionData = serviceOptions.find(opt => opt.name === formData.selectedOption);
    const totalPrice = selectedOptionData?.price || basePrice;

    // Calculate form completion percentage
    const calculateProgress = () => {
        let completed = 0;
        const fields = ['name', 'email', 'phone', 'selectedOption', 'date', 'time', 'address'];
        fields.forEach(field => {
            if (formData[field]) completed++;
        });
        return Math.round((completed / fields.length) * 100);
    };

    const progress = calculateProgress();

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                        {successAnim ? (
                            <Lottie
                                animationData={successAnim}
                                loop={false}
                                autoplay
                                onComplete={handleRedirect}
                                className="w-64 h-64 mx-auto"
                            />
                        ) : (
                            <div className="w-64 h-64 flex items-center justify-center text-gray-500">
                                Loading animation...
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-lk-text mt-4">Booking Confirmed!</h2>
                        <p className="text-gray-600 mt-2">We’ll reach out soon with the details.</p>
                    </div>
                </div>
            )}
            <div className="max-w-6xl mx-auto">
                {/* Back button with enhanced styling */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        to={backLink}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-lk-teal/20 text-lk-teal hover:bg-lk-teal hover:text-white transition-all duration-300 mb-8 group shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to {serviceName}</span>
                    </Link>
                </motion.div>

                {/* Enhanced Header with Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-lk-teal via-lk-mustard to-lk-teal bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Book {serviceName}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Fill in your details and we'll get back to you shortly
                            </p>
                        </div>
                        {/* Progress Indicator */}
                        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-full border border-lk-teal/20 shadow-sm">
                            <div className="relative w-12 h-12">
                                <svg className="transform -rotate-90 w-12 h-12">
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="#e5e7eb"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="url(#gradient)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 20}`}
                                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                                        className="transition-all duration-500"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#0d9488" />
                                            <stop offset="100%" stopColor="#eab308" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-lk-teal">{progress}%</span>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-500 font-medium">Form Progress</p>
                                <p className="text-sm font-bold text-lk-text">{progress === 100 ? 'Complete!' : 'In Progress'}</p>
                            </div>
                        </div>
                    </div>
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

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Personal Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lk-teal to-lk-mustard flex items-center justify-center text-white font-bold shadow-lg">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-lk-text">Personal Information</h3>
                                            <p className="text-sm text-gray-500">Tell us about yourself</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <User size={16} className="text-lk-teal" />
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300"
                                                    placeholder="Enter your full name"
                                                />
                                                {formData.name && (
                                                    <CheckCircle2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Phone size={16} className="text-lk-teal" />
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300"
                                                    placeholder="+91 98765 43210"
                                                />
                                                {formData.phone && (
                                                    <CheckCircle2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 relative group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Mail size={16} className="text-lk-teal" />
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300"
                                                    placeholder="john.doe@example.com"
                                                />
                                                {formData.email && (
                                                    <CheckCircle2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Service Details */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pt-6 border-t-2 border-gray-100"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lk-teal to-lk-mustard flex items-center justify-center text-white font-bold shadow-lg">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-lk-text">Service Details</h3>
                                            <p className="text-sm text-gray-500">When and where do you need the service?</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {serviceOptions.length > 0 && (
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                    <Package size={16} className="text-lk-teal" />
                                                    Select Service *
                                                </label>
                                                <select
                                                    name="selectedOption"
                                                    value={formData.selectedOption}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={location.state?.selectedService && serviceOptions.some(opt => opt.name === location.state.selectedService)}
                                                    className={`w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300 ${location.state?.selectedService && serviceOptions.some(opt => opt.name === location.state.selectedService)
                                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                        : ''
                                                        }`}
                                                >
                                                    {serviceOptions.map((option, idx) => (
                                                        <option key={idx} value={option.name}>
                                                            {option.name} - ₹{option.price}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Calendar size={16} className="text-lk-teal" />
                                                Preferred Date *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300"
                                                />
                                                {formData.date && (
                                                    <CheckCircle2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <Clock size={16} className="text-lk-teal" />
                                                Preferred Time *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300"
                                                />
                                                {formData.time && (
                                                    <CheckCircle2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <MapPin size={16} className="text-lk-teal" />
                                                Service Address *
                                            </label>
                                            {/* Saved Address Selector */}
                                            {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                                                <select
                                                    value={formData.selectedAddressId}
                                                    onChange={handleAddressSelect}
                                                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 bg-white hover:border-gray-300 mb-3"
                                                >
                                                    <option value="">-- Select a saved address or enter new --</option>
                                                    {user.addresses.map((addr) => (
                                                        <option key={addr._id} value={addr._id}>
                                                            {addr.label} - {addr.addressLine.substring(0, 50)}...
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            <div className="flex gap-3">
                                                <div className="flex-1 relative">
                                                    <textarea
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        required
                                                        rows="3"
                                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 resize-none bg-white hover:border-gray-300"
                                                        placeholder="Enter your complete address"
                                                    />
                                                    {formData.address && (
                                                        <CheckCircle2 size={18} className="absolute right-4 top-4 text-green-500" />
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleUseCurrentLocation}
                                                    disabled={isLoadingLocation}
                                                    className="px-5 py-3 bg-gradient-to-r from-lk-teal to-lk-mustard text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit hover:scale-105"
                                                    title="Use current location"
                                                >
                                                    {isLoadingLocation ? (
                                                        <Loader2 size={20} className="animate-spin" />
                                                    ) : (
                                                        <Navigation size={20} />
                                                    )}
                                                    <span className="hidden sm:inline font-medium">Detect</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Additional Notes */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-6 border-t-2 border-gray-100"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lk-teal focus:ring-4 focus:ring-lk-teal/10 outline-none transition-all duration-300 resize-none bg-white hover:border-gray-300"
                                        placeholder="Any special requirements or preferences..."
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-lk-teal via-lk-mustard to-lk-teal bg-[length:200%_auto] animate-gradient text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={24} />
                                            Confirm Booking
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </GlassCard>
                    </div>

                    {/* Enhanced Booking Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassCard className="p-6 sticky top-24 border-2 border-lk-teal/10" intensity="medium">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-lk-teal to-lk-mustard rounded-full"></div>
                                    <h3 className="text-2xl font-black text-lk-text">Booking Summary</h3>
                                </div>

                                {/* Service Image with overlay */}
                                <div className="relative mb-6 rounded-xl overflow-hidden group">
                                    <img
                                        src={serviceImage}
                                        alt={serviceName}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white font-bold text-lg drop-shadow-lg">{serviceName}</p>
                                    </div>
                                </div>

                                {/* Details with enhanced styling */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100">
                                        <span className="text-gray-600 font-medium">Service</span>
                                        <span className="font-bold text-lk-text">{serviceName}</span>
                                    </div>

                                    {formData.selectedOption && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex justify-between items-center pb-3 border-b-2 border-gray-100"
                                        >
                                            <span className="text-gray-600 font-medium">Selected</span>
                                            <span className="font-bold text-lk-text text-sm">{formData.selectedOption}</span>
                                        </motion.div>
                                    )}

                                    {formData.date && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex justify-between items-center pb-3 border-b-2 border-gray-100"
                                        >
                                            <span className="text-gray-600 font-medium flex items-center gap-2">
                                                <Calendar size={16} className="text-lk-teal" />
                                                Date
                                            </span>
                                            <span className="font-bold text-lk-text">{new Date(formData.date).toLocaleDateString()}</span>
                                        </motion.div>
                                    )}

                                    {formData.time && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex justify-between items-center pb-3 border-b-2 border-gray-100"
                                        >
                                            <span className="text-gray-600 font-medium flex items-center gap-2">
                                                <Clock size={16} className="text-lk-teal" />
                                                Time
                                            </span>
                                            <span className="font-bold text-lk-text">{formData.time}</span>
                                        </motion.div>
                                    )}

                                    <div className="flex justify-between items-center pt-4 bg-gradient-to-r from-lk-teal/5 to-lk-mustard/5 -mx-6 px-6 py-4 mt-4">
                                        <span className="text-lg font-black text-lk-text">Total Amount</span>
                                        <span className="text-3xl font-black bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent">
                                            ₹{totalPrice}
                                        </span>
                                    </div>
                                </div>

                                {/* Payment Info with enhanced design */}
                                <div className="bg-gradient-to-br from-lk-teal/10 to-lk-mustard/10 rounded-xl p-4 border border-lk-teal/20">
                                    <div className="flex items-start gap-3 text-sm text-gray-700">
                                        <CreditCard size={20} className="mt-0.5 text-lk-teal flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-lk-text mb-1">Payment Information</p>
                                            <p>Payment will be collected after service completion. We accept cash, cards, and digital payments.</p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
