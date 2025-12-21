import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowLeft,
    Package
} from 'lucide-react';
import { bookingAPI } from '../services/api';
import GlassCard from '../components/ui/GlassCard';
import SkeletonStats from '../components/ui/SkeletonStats';
import SkeletonTable from '../components/ui/SkeletonTable';
import ServiceManagement from '../components/admin/ServiceManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
        revenue: 0
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getAll();
            const bookingsData = response.data.data;
            setBookings(bookingsData);

            // Calculate stats
            const stats = {
                total: bookingsData.length,
                pending: bookingsData.filter(b => b.status === 'pending').length,
                confirmed: bookingsData.filter(b => b.status === 'confirmed').length,
                completed: bookingsData.filter(b => b.status === 'completed').length,
                cancelled: bookingsData.filter(b => b.status === 'cancelled').length,
                revenue: bookingsData
                    .filter(b => b.status === 'completed')
                    .reduce((sum, b) => sum + b.totalPrice, 0)
            };
            setStats(stats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            await bookingAPI.update(bookingId, { status: newStatus });
            fetchBookings(); // Refresh data
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
            'in-progress': 'bg-purple-100 text-purple-800 border-purple-300',
            completed: 'bg-green-100 text-green-800 border-green-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: <Clock size={16} />,
            confirmed: <CheckCircle size={16} />,
            'in-progress': <TrendingUp size={16} />,
            completed: <CheckCircle size={16} />,
            cancelled: <XCircle size={16} />
        };
        return icons[status] || <AlertCircle size={16} />;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-80 mb-2" />
                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-64" />
                    </div>

                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <SkeletonStats count={4} />
                    </div>

                    {/* Table Skeleton */}
                    <GlassCard className="p-6" intensity="medium">
                        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-48 mb-6" />
                        <SkeletonTable rows={5} columns={6} />
                    </GlassCard>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-lk-teal hover:text-lk-mustard transition-colors mb-4 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-3 mb-2">
                        <LayoutDashboard size={32} className="text-lk-teal" />
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-600">Manage bookings, users, and platform analytics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <GlassCard className="p-6" intensity="medium">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 font-medium">Total Bookings</span>
                                <Calendar className="text-lk-teal" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-lk-text">{stats.total}</div>
                            <div className="text-sm text-gray-500 mt-1">All time</div>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-6" intensity="medium">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 font-medium">Pending</span>
                                <Clock className="text-yellow-500" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-lk-text">{stats.pending}</div>
                            <div className="text-sm text-gray-500 mt-1">Awaiting confirmation</div>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassCard className="p-6" intensity="medium">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 font-medium">Completed</span>
                                <CheckCircle className="text-green-500" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-lk-text">{stats.completed}</div>
                            <div className="text-sm text-gray-500 mt-1">Successfully done</div>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <GlassCard className="p-6" intensity="medium">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 font-medium">Revenue</span>
                                <DollarSign className="text-green-600" size={24} />
                            </div>
                            <div className="text-3xl font-bold text-lk-text">₹{stats.revenue}</div>
                            <div className="text-sm text-gray-500 mt-1">From completed bookings</div>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6">
                    <div className="flex gap-2 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${activeTab === 'bookings'
                                ? 'text-lk-teal border-b-2 border-lk-teal'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Calendar size={20} />
                            Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${activeTab === 'services'
                                ? 'text-lk-teal border-b-2 border-lk-teal'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Package size={20} />
                            Services
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'bookings' ? (
                    /* Bookings Table */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <GlassCard className="p-6" intensity="medium">
                            <h2 className="text-2xl font-bold text-lk-text mb-6 flex items-center gap-2">
                                <Calendar size={24} />
                                All Bookings
                            </h2>

                            {bookings.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>No bookings yet</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div>
                                                            <div className="font-semibold text-lk-text">{booking.customerName}</div>
                                                            <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                                                            <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div>
                                                            <div className="font-medium text-lk-text capitalize">{booking.serviceType}</div>
                                                            <div className="text-sm text-gray-500">{booking.serviceOption}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div>
                                                            <div className="font-medium text-lk-text">
                                                                {new Date(booking.date).toLocaleDateString()}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{booking.time}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-bold text-green-600">₹{booking.totalPrice}</div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                                            {getStatusIcon(booking.status)}
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <select
                                                            value={booking.status}
                                                            onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="in-progress">In Progress</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                ) : (
                    /* Services Management */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ServiceManagement />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
