import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Clock, MapPin, Edit, Save, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import GlassCard from '../components/ui/GlassCard';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [activeBookings, setActiveBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                phone: user.phone
            });
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        try {
            const response = await bookingAPI.getMyBookings();
            const bookings = response.data.data;

            const active = bookings.filter(b =>
                ['pending', 'confirmed', 'in-progress'].includes(b.status)
            );
            const past = bookings.filter(b =>
                ['completed', 'cancelled'].includes(b.status)
            );

            setActiveBookings(active);
            setPastBookings(past);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const result = await updateProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await bookingAPI.cancel(bookingId);
                fetchMyBookings(); // Refresh list
                setMessage({ type: 'success', text: 'Booking cancelled successfully' });
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to cancel booking' });
            }
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: User Profile */}
                <div className="lg:col-span-1">
                    <GlassCard className="p-6 sticky top-32" intensity="medium">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-lk-text">My Profile</h2>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="p-2 text-lk-teal hover:bg-lk-teal/10 rounded-full transition-colors"
                                >
                                    <Edit size={20} />
                                </button>
                            )}
                        </div>

                        {message.text && (
                            <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {editing ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lk-teal/20 focus:border-lk-teal outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lk-teal/20 focus:border-lk-teal outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-lk-teal text-white py-2 rounded-lg font-medium hover:bg-lk-teal/90 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(false);
                                            setFormData({ name: user.name, phone: user.phone });
                                        }}
                                        className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={16} /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-lk-teal to-lk-mustard rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-lk-text">{user?.name}</h3>
                                        <span className="inline-block px-3 py-1 bg-lk-teal/10 text-lk-teal rounded-full text-xs font-semibold uppercase">
                                            {user?.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail size={18} />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone size={18} />
                                        <span>{user?.phone}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* Right Column: Bookings */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Bookings */}
                    <section>
                        <h2 className="text-2xl font-bold text-lk-text mb-4 flex items-center gap-2">
                            <Calendar className="text-lk-teal" />
                            Active Bookings
                        </h2>

                        {activeBookings.length === 0 ? (
                            <GlassCard className="p-8 text-center text-gray-500" intensity="low">
                                <p>No active bookings found.</p>
                            </GlassCard>
                        ) : (
                            <div className="space-y-4">
                                {activeBookings.map((booking) => (
                                    <BookingCard
                                        key={booking._id}
                                        booking={booking}
                                        onCancel={() => handleCancelBooking(booking._id)}
                                        isActive={true}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Past Bookings */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-400 mb-4 flex items-center gap-2">
                            <Clock />
                            Past Bookings
                        </h2>

                        {pastBookings.length === 0 ? (
                            <p className="text-gray-500 italic">No past bookings.</p>
                        ) : (
                            <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                                {pastBookings.map((booking) => (
                                    <BookingCard
                                        key={booking._id}
                                        booking={booking}
                                        isActive={false}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </div>
    );
};

// Helper Component for Booking Card
const BookingCard = ({ booking, onCancel, isActive }) => {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            'in-progress': 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <GlassCard className="p-6 transition-transform hover:-translate-y-1" intensity="low">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                        <span className="text-sm text-gray-500">
                            #{booking._id.slice(-6)}
                        </span>
                    </div>
                    <h3 className="font-bold text-lg text-lk-text capitalize mb-1">
                        {booking.serviceType} - {booking.serviceOption}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(booking.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {booking.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin size={14} />
                        {booking.address}
                    </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
                    <div className="text-xl font-bold text-lk-teal">
                        ${booking.totalPrice}
                    </div>
                    {isActive && booking.status !== 'cancelled' && (
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                            Cancel Booking
                        </button>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};

export default ProfilePage;
