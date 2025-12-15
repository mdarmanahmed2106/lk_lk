import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../src/models/Service.js';

dotenv.config();

const services = [
    // Salon Services
    {
        name: "Women's Haircut & Styling",
        category: "salon",
        price: 30,
        description: "Professional haircut and styling service for women",
        rating: 4.9,
        reviews: 15000,
        discount: "20%",
        image: "/images/womens-salon-hero.png"
    },
    {
        name: "Men's Haircut & Beard Trim",
        category: "salon",
        price: 25,
        description: "Complete haircut and beard grooming for men",
        rating: 4.9,
        reviews: 8500,
        discount: "10%",
        image: "/images/womens-salon-hero.png"
    },
    {
        name: "Hair Coloring & Highlights",
        category: "salon",
        price: 50,
        description: "Professional hair coloring and highlighting services",
        rating: 4.8,
        reviews: 12000,
        discount: "15%",
        image: "/images/womens-salon-hero.png"
    },
    {
        name: "Facial & Skin Treatment",
        category: "salon",
        price: 40,
        description: "Rejuvenating facial and skin care treatments",
        rating: 4.9,
        reviews: 10000,
        image: "/images/womens-salon-hero.png"
    },

    // Cleaning Services
    {
        name: "Deep Home Cleaning",
        category: "cleaning",
        price: 80,
        description: "Comprehensive deep cleaning for your entire home",
        rating: 4.8,
        reviews: 20000,
        discount: "25%",
        image: "/images/cleaning-hero.png"
    },
    {
        name: "Kitchen Cleaning",
        category: "cleaning",
        price: 35,
        description: "Thorough kitchen cleaning and sanitization",
        rating: 4.7,
        reviews: 15000,
        discount: "15%",
        image: "/images/cleaning-hero.png"
    },
    {
        name: "Bathroom Cleaning",
        category: "cleaning",
        price: 30,
        description: "Complete bathroom deep cleaning service",
        rating: 4.8,
        reviews: 18000,
        image: "/images/cleaning-hero.png"
    },
    {
        name: "Office Cleaning",
        category: "cleaning",
        price: 100,
        description: "Professional office space cleaning",
        rating: 4.9,
        reviews: 12000,
        discount: "20%",
        image: "/images/cleaning-hero.png"
    },

    // Electrician Services
    {
        name: "AC Installation & Repair",
        category: "electrician",
        price: 60,
        description: "Professional AC installation and repair services",
        rating: 4.9,
        reviews: 25000,
        discount: "30%",
        image: "/images/electrician-hero.png"
    },
    {
        name: "Electrical Wiring",
        category: "electrician",
        price: 45,
        description: "Safe and reliable electrical wiring services",
        rating: 4.8,
        reviews: 18000,
        discount: "20%",
        image: "/images/electrician-hero.png"
    },
    {
        name: "Fan Installation",
        category: "electrician",
        price: 25,
        description: "Ceiling and wall fan installation",
        rating: 4.7,
        reviews: 15000,
        image: "/images/electrician-hero.png"
    },
    {
        name: "Light Fixture Installation",
        category: "electrician",
        price: 30,
        description: "Installation of lights and fixtures",
        rating: 4.8,
        reviews: 12000,
        discount: "15%",
        image: "/images/electrician-hero.png"
    },

    // Plumber Services
    {
        name: "Pipe Repair & Replacement",
        category: "plumber",
        price: 50,
        description: "Expert pipe repair and replacement services",
        rating: 4.8,
        reviews: 22000,
        discount: "25%",
        image: "/images/plumber-hero.png"
    },
    {
        name: "Tap & Faucet Repair",
        category: "plumber",
        price: 20,
        description: "Quick tap and faucet repair service",
        rating: 4.7,
        reviews: 18000,
        discount: "10%",
        image: "/images/plumber-hero.png"
    },
    {
        name: "Toilet Installation",
        category: "plumber",
        price: 70,
        description: "Professional toilet installation service",
        rating: 4.9,
        reviews: 15000,
        image: "/images/plumber-hero.png"
    },
    {
        name: "Drainage Cleaning",
        category: "plumber",
        price: 40,
        description: "Complete drainage system cleaning",
        rating: 4.8,
        reviews: 20000,
        discount: "20%",
        image: "/images/plumber-hero.png"
    },

    // Car Wash Services
    {
        name: "Premium Car Wash",
        category: "car-wash",
        price: 35,
        description: "Complete exterior and interior car wash",
        rating: 4.9,
        reviews: 30000,
        discount: "30%",
        image: "/images/car-wash-hero.png"
    },
    {
        name: "Car Detailing",
        category: "car-wash",
        price: 80,
        description: "Professional car detailing service",
        rating: 4.8,
        reviews: 15000,
        discount: "25%",
        image: "/images/car-wash-hero.png"
    },
    {
        name: "Engine Cleaning",
        category: "car-wash",
        price: 45,
        description: "Thorough engine bay cleaning",
        rating: 4.7,
        reviews: 12000,
        image: "/images/car-wash-hero.png"
    },
    {
        name: "Paint Protection",
        category: "car-wash",
        price: 100,
        description: "Ceramic coating and paint protection",
        rating: 4.9,
        reviews: 10000,
        discount: "20%",
        image: "/images/car-wash-hero.png"
    },

    // Sports Services
    {
        name: "Cricket Coaching",
        category: "sports",
        price: 50,
        description: "Professional cricket coaching sessions",
        rating: 4.9,
        reviews: 8000,
        discount: "20%",
        image: "/images/sports-hero.png"
    },
    {
        name: "Football Training",
        category: "sports",
        price: 45,
        description: "Expert football training and skills development",
        rating: 4.8,
        reviews: 7000,
        discount: "15%",
        image: "/images/sports-hero.png"
    },
    {
        name: "Badminton Court Booking",
        category: "sports",
        price: 30,
        description: "Premium badminton court rental",
        rating: 4.7,
        reviews: 12000,
        image: "/images/sports-hero.png"
    },
    {
        name: "Gym Membership",
        category: "sports",
        price: 100,
        description: "Monthly gym membership with trainer",
        rating: 4.9,
        reviews: 15000,
        discount: "25%",
        image: "/images/sports-hero.png"
    },

    // Events Services
    {
        name: "Concert Tickets",
        category: "events",
        price: 75,
        description: "Premium concert and live music event tickets",
        rating: 4.9,
        reviews: 25000,
        discount: "15%",
        image: "/images/events-hero.png"
    },
    {
        name: "Sports Event Tickets",
        category: "events",
        price: 60,
        description: "Tickets for major sporting events",
        rating: 4.8,
        reviews: 20000,
        discount: "10%",
        image: "/images/events-hero.png"
    },
    {
        name: "Festival Passes",
        category: "events",
        price: 100,
        description: "Multi-day festival passes and VIP access",
        rating: 4.9,
        reviews: 18000,
        discount: "20%",
        image: "/images/events-hero.png"
    },
    {
        name: "Theater Shows",
        category: "events",
        price: 50,
        description: "Theater and drama show tickets",
        rating: 4.7,
        reviews: 12000,
        image: "/images/events-hero.png"
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('🗑️  Cleared existing services');

        // Insert new services
        await Service.insertMany(services);
        console.log(`✅ Seeded ${services.length} services successfully!`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedServices();
