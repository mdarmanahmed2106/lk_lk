import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './src/models/Service.js';

dotenv.config();

const services = [
    {
        name: 'Haircut & Styling',
        category: 'salon',
        description: 'Professional haircut and styling service',
        price: 299,
        rating: 4.5,
        reviews: 120,
        discount: '20% OFF',
        isActive: true
    },
    {
        name: 'Deep House Cleaning',
        category: 'cleaning',
        description: 'Complete deep cleaning of your home',
        price: 1499,
        rating: 4.8,
        reviews: 85,
        discount: '15% OFF',
        isActive: true
    },
    {
        name: 'Electrical Repair',
        category: 'electrician',
        description: 'Expert electrical repair and installation',
        price: 499,
        rating: 4.6,
        reviews: 95,
        isActive: true
    },
    {
        name: 'Plumbing Service',
        category: 'plumber',
        description: 'Professional plumbing repair and maintenance',
        price: 599,
        rating: 4.7,
        reviews: 110,
        isActive: true
    },
    {
        name: 'Car Wash & Detailing',
        category: 'car-wash',
        description: 'Premium car wash and detailing service',
        price: 799,
        rating: 4.4,
        reviews: 75,
        discount: '10% OFF',
        isActive: true
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing services
        await Service.deleteMany();
        console.log('🗑️  Cleared existing services');

        // Insert new services
        await Service.insertMany(services);
        console.log(`✅ ${services.length} services added successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedServices();
