import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './src/models/Service.js';

dotenv.config();

const services = [
    // Salon Services
    {
        name: 'Haircut & Styling',
        category: 'salon',
        description: 'Professional haircut and styling service',
        price: 299,
        rating: 4.5,
        reviews: 1200,
        discount: '20% OFF',
        isActive: true
    },
    {
        name: 'Hair Coloring',
        category: 'salon',
        description: 'Expert hair coloring and highlights',
        price: 1499,
        rating: 4.7,
        reviews: 850,
        discount: '15% OFF',
        isActive: true
    },
    {
        name: 'Facial & Cleanup',
        category: 'salon',
        description: 'Relaxing facial and deep cleanup',
        price: 799,
        rating: 4.6,
        reviews: 950,
        isActive: true
    },

    // Cleaning Services
    {
        name: 'Deep House Cleaning',
        category: 'cleaning',
        description: 'Complete deep cleaning of your home',
        price: 1499,
        rating: 4.8,
        reviews: 2100,
        discount: '15% OFF',
        isActive: true
    },
    {
        name: 'Kitchen Cleaning',
        category: 'cleaning',
        description: 'Thorough kitchen cleaning and sanitization',
        price: 699,
        rating: 4.7,
        reviews: 1500,
        isActive: true
    },
    {
        name: 'Bathroom Cleaning',
        category: 'cleaning',
        description: 'Deep bathroom cleaning and disinfection',
        price: 499,
        rating: 4.6,
        reviews: 1800,
        discount: '10% OFF',
        isActive: true
    },

    // Electrician Services
    {
        name: 'Electrical Repair',
        category: 'electrician',
        description: 'Expert electrical repair and installation',
        price: 499,
        rating: 4.6,
        reviews: 1350,
        isActive: true
    },
    {
        name: 'Wiring & Rewiring',
        category: 'electrician',
        description: 'Complete home wiring solutions',
        price: 2499,
        rating: 4.8,
        reviews: 750,
        discount: '20% OFF',
        isActive: true
    },
    {
        name: 'Fan Installation',
        category: 'electrician',
        description: 'Professional ceiling fan installation',
        price: 299,
        rating: 4.5,
        reviews: 1100,
        isActive: true
    },

    // Plumber Services
    {
        name: 'Plumbing Repair',
        category: 'plumber',
        description: 'Professional plumbing repair and maintenance',
        price: 599,
        rating: 4.7,
        reviews: 1650,
        isActive: true
    },
    {
        name: 'Pipe Installation',
        category: 'plumber',
        description: 'New pipe installation and replacement',
        price: 1299,
        rating: 4.6,
        reviews: 900,
        discount: '10% OFF',
        isActive: true
    },
    {
        name: 'Bathroom Fitting',
        category: 'plumber',
        description: 'Complete bathroom fitting services',
        price: 2999,
        rating: 4.8,
        reviews: 650,
        isActive: true
    },

    // Car Wash Services
    {
        name: 'Car Wash & Detailing',
        category: 'car-wash',
        description: 'Premium car wash and detailing service',
        price: 799,
        rating: 4.4,
        reviews: 1250,
        discount: '10% OFF',
        isActive: true
    },
    {
        name: 'Interior Cleaning',
        category: 'car-wash',
        description: 'Deep interior car cleaning',
        price: 599,
        rating: 4.5,
        reviews: 980,
        isActive: true
    },
    {
        name: 'Ceramic Coating',
        category: 'car-wash',
        description: 'Professional ceramic coating protection',
        price: 4999,
        rating: 4.9,
        reviews: 450,
        discount: '15% OFF',
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
