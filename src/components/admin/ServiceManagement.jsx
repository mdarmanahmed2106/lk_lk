import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Power, Search, X } from 'lucide-react';
import { serviceAPI } from '../../services/api';
import GlassCard from '../ui/GlassCard';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'salon',
        price: '',
        description: '',
        rating: '4.8',
        reviews: '1000',
        discount: '',
        image: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await serviceAPI.getAll();
            setServices(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await serviceAPI.update(editingService._id, formData);
            } else {
                await serviceAPI.create(formData);
            }
            fetchServices();
            closeModal();
            toast.success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        } catch (error) {
            console.error('Error saving service:', error);
            toast.error('Failed to save service. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await serviceAPI.delete(id);
                fetchServices();
                toast.success('Service deleted successfully!');
            } catch (error) {
                console.error('Error deleting service:', error);
                toast.error('Failed to delete service. Please try again.');
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await serviceAPI.toggleStatus(id);
            fetchServices();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                category: service.category,
                price: service.price.toString(),
                description: service.description,
                rating: service.rating?.toString() || '4.8',
                reviews: service.reviews?.toString() || '1000',
                discount: service.discount || '',
                image: service.image || ''
            });
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                category: 'salon',
                price: '',
                description: '',
                rating: '4.8',
                reviews: '1000',
                discount: '',
                image: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingService(null);
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-lk-text">Service Management</h2>
                    <p className="text-gray-600">Manage all services across categories</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lk-teal to-lk-mustard text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add Service
                </button>
            </div>

            {/* Filters */}
            <GlassCard className="p-4" intensity="low">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                    >
                        <option value="all">All Categories</option>
                        <option value="salon">Salon</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="car-wash">Car Wash</option>
                        <option value="sports">Sports</option>
                        <option value="events">Events</option>
                    </select>
                </div>
            </GlassCard>

            {/* Services Table */}
            <GlassCard className="p-6" intensity="medium">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lk-teal mx-auto"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServices.map((service) => (
                                    <tr key={service._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-lk-text">{service.name}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 bg-lk-teal/10 text-lk-teal rounded-full text-sm font-medium capitalize">
                                                {service.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="font-bold text-green-600">₹{service.price}</div>
                                            {service.discount && (
                                                <div className="text-xs text-orange-600">{service.discount} off</div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => handleToggleStatus(service._id)}
                                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${service.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                <Power size={12} />
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openModal(service)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredServices.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No services found
                            </div>
                        )}
                    </div>
                )}
            </GlassCard>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-lk-text">
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h3>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    >
                                        <option value="salon">Salon</option>
                                        <option value="cleaning">Cleaning</option>
                                        <option value="electrician">Electrician</option>
                                        <option value="plumber">Plumber</option>
                                        <option value="car-wash">Car Wash</option>
                                        <option value="sports">Sports</option>
                                        <option value="events">Events</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                                    <input
                                        type="text"
                                        value={formData.discount}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        placeholder="e.g., 20%"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                    <input
                                        type="number"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Reviews</label>
                                    <input
                                        type="number"
                                        value={formData.reviews}
                                        onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="/images/service.png"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-lk-teal focus:ring-2 focus:ring-lk-teal/20 outline-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-gradient-to-r from-lk-teal to-lk-mustard text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                >
                                    {editingService ? 'Update Service' : 'Create Service'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ServiceManagement;
