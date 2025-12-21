import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Clock, MapPin, Edit, Save, X, AlertCircle, Plus, Trash2, Star, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import GlassCard from '../components/ui/GlassCard';

const ProfilePage = () => {
    const { user, updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
    const [activeBookings, setActiveBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    // Address management state
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressFormData, setAddressFormData] = useState({
        label: '',
        addressLine: '',
        isDefault: false
    });

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

    // Address management functions
    const handleAddAddress = async (e) => {
        e.preventDefault();
        const result = await addAddress(addressFormData);
        if (result.success) {
            setMessage({ type: 'success', text: 'Address added successfully!' });
            setShowAddressForm(false);
            setAddressFormData({ label: '', addressLine: '', isDefault: false });
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        const result = await updateAddress(editingAddressId, addressFormData);
        if (result.success) {
            setMessage({ type: 'success', text: 'Address updated successfully!' });
            setEditingAddressId(null);
            setShowAddressForm(false);
            setAddressFormData({ label: '', addressLine: '', isDefault: false });
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            const result = await deleteAddress(id);
            if (result.success) {
                setMessage({ type: 'success', text: 'Address deleted successfully' });
            } else {
                setMessage({ type: 'error', text: result.message });
            }
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleSetDefault = async (id) => {
        const result = await setDefaultAddress(id);
        if (result.success) {
            setMessage({ type: 'success', text: 'Default address updated' });
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const startEditAddress = (address) => {
        setEditingAddressId(address._id);
        setAddressFormData({
            label: address.label,
            addressLine: address.addressLine,
            isDefault: address.isDefault
        });
        setShowAddressForm(true);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-lk-teal hover:text-lk-mustard transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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

                        {/* Saved Addresses Section */}
                        <GlassCard className="p-6 mt-8" intensity="medium">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-lk-text">Saved Addresses</h2>
                                {!showAddressForm && (
                                    <button
                                        onClick={() => {
                                            setShowAddressForm(true);
                                            setEditingAddressId(null);
                                            setAddressFormData({ label: '', addressLine: '', isDefault: false });
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-lk-teal text-white rounded-lg font-medium hover:bg-lk-teal/90 transition-colors"
                                    >
                                        <Plus size={18} /> Add Address
                                    </button>
                                )}
                            </div>

                            {/* Address Form */}
                            {showAddressForm && (
                                <form onSubmit={editingAddressId ? handleUpdateAddress : handleAddAddress} className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                                            <input
                                                type="text"
                                                value={addressFormData.label}
                                                onChange={(e) => setAddressFormData({ ...addressFormData, label: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lk-teal/20 focus:border-lk-teal outline-none"
                                                placeholder="e.g., Home, Office"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                            <textarea
                                                value={addressFormData.addressLine}
                                                onChange={(e) => setAddressFormData({ ...addressFormData, addressLine: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lk-teal/20 focus:border-lk-teal outline-none resize-none"
                                                rows="3"
                                                placeholder="Enter full address"
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="isDefault"
                                                checked={addressFormData.isDefault}
                                                onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                                                className="w-4 h-4 text-lk-teal border-gray-300 rounded focus:ring-lk-teal"
                                            />
                                            <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-lk-teal text-white py-2 rounded-lg font-medium hover:bg-lk-teal/90 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Save size={16} /> {editingAddressId ? 'Update' : 'Save'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddressForm(false);
                                                    setEditingAddressId(null);
                                                    setAddressFormData({ label: '', addressLine: '', isDefault: false });
                                                }}
                                                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <X size={16} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Address List */}
                            <div className="space-y-3">
                                {user?.addresses && user.addresses.length > 0 ? (
                                    user.addresses.map((address) => (
                                        <div key={address._id} className="p-4 border border-gray-200 rounded-lg hover:border-lk-teal/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-lk-text">{address.label}</h4>
                                                        {address.isDefault && (
                                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                                <Star size={12} fill="currentColor" /> Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600">{address.addressLine}</p>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    {!address.isDefault && (
                                                        <button
                                                            onClick={() => handleSetDefault(address._id)}
                                                            className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                                                            title="Set as default"
                                                        >
                                                            <Star size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => startEditAddress(address)}
                                                        className="p-2 text-gray-400 hover:text-lk-teal hover:bg-lk-teal/10 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(address._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No saved addresses yet. Add one to get started!</p>
                                )}
                            </div>
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
                        ₹{booking.totalPrice}
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
