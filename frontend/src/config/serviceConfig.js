// Service configurations for all booking pages
// Prices aligned with database
export const serviceConfigs = {
    salon: {
        serviceName: "Salon Services",
        serviceImage: "/images/womens-salon-hero.png",
        basePrice: "30",
        backLink: "/salon",
        serviceOptions: [
            { name: "Women's Haircut & Styling", price: "30" },
            { name: "Men's Haircut & Beard Trim", price: "25" },
            { name: "Hair Coloring & Highlights", price: "50" },
            { name: "Facial & Skin Treatment", price: "40" }
        ]
    },
    cleaning: {
        serviceName: "Cleaning Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "30",
        backLink: "/cleaning",
        serviceOptions: [
            { name: "Deep Home Cleaning", price: "80" },
            { name: "Kitchen Cleaning", price: "35" },
            { name: "Bathroom Cleaning", price: "30" },
            { name: "Office Cleaning", price: "100" }
        ]
    },
    electrician: {
        serviceName: "Electrician Services",
        serviceImage: "/images/ac-repair-hero.png",
        basePrice: "25",
        backLink: "/electrician",
        serviceOptions: [
            { name: "AC Installation & Repair", price: "60" },
            { name: "Electrical Wiring", price: "45" },
            { name: "Fan Installation", price: "25" },
            { name: "Light Fixture Installation", price: "30" }
        ]
    },
    plumber: {
        serviceName: "Plumber Services",
        serviceImage: "/images/bathroom-cleaning.png",
        basePrice: "20",
        backLink: "/plumber",
        serviceOptions: [
            { name: "Pipe Repair & Replacement", price: "50" },
            { name: "Tap & Faucet Repair", price: "20" },
            { name: "Toilet Installation", price: "70" },
            { name: "Drainage Cleaning", price: "40" }
        ]
    },
    "car-wash": {
        serviceName: "Car Wash Services",
        serviceImage: "/images/car-wash-hero.png",
        basePrice: "35",
        backLink: "/car-wash",
        serviceOptions: [
            { name: "Premium Car Wash", price: "35" },
            { name: "Car Detailing", price: "80" },
            { name: "Engine Cleaning", price: "45" },
            { name: "Paint Protection", price: "100" }
        ]
    },
    sports: {
        serviceName: "Sports Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "30",
        backLink: "/sports",
        serviceOptions: [
            { name: "Cricket Coaching", price: "50" },
            { name: "Football Training", price: "45" },
            { name: "Badminton Court Booking", price: "30" },
            { name: "Gym Membership", price: "100" }
        ]
    },
    events: {
        serviceName: "Event Tickets",
        serviceImage: "/images/salon-home-promo.png",
        basePrice: "50",
        backLink: "/events",
        serviceOptions: [
            { name: "Concert Tickets", price: "75" },
            { name: "Sports Event Tickets", price: "60" },
            { name: "Festival Passes", price: "100" },
            { name: "Theater Shows", price: "50" }
        ]
    }
};

export default serviceConfigs;
