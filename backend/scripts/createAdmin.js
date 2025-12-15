import mongoose from 'mongoose';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@lk.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email: admin@lk.com');
            console.log('Password: admin123');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@lk.com',
            phone: '1234567890',
            password: 'admin123',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📧 Email: admin@lk.com');
        console.log('🔑 Password: admin123');
        console.log('');
        console.log('You can now login with these credentials!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
