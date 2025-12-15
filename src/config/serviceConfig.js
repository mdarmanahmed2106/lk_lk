// Service configurations for all booking pages
export const serviceConfigs = {
    salon: {
        serviceName: "Salon Services",
        serviceImage: "/images/womens-salon-hero.png",
        basePrice: "30",
        backLink: "/salon",
        serviceOptions: [
            { name: "Women's Haircut & Styling", price: "30" },
            { name: "Men's Haircut & Beard Trim", price: "25" },
            { name: "Full Body Massage (60 min)", price: "49" },
            { name: "Facial & Skin Treatment", price: "35" },
            { name: "Hair Coloring", price: "45" },
            { name: "Bridal Makeup", price: "80" }
        ]
    },
    cleaning: {
        serviceName: "Cleaning Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "19",
        backLink: "/cleaning",
        serviceOptions: [
            { name: "Intense Bathroom Cleaning", price: "19" },
            { name: "Sofa Deep Cleaning", price: "35" },
            { name: "Full Home Cleaning", price: "45" },
            { name: "Kitchen Deep Cleaning", price: "28" },
            { name: "Carpet Cleaning", price: "30" },
            { name: "Window Cleaning", price: "20" }
        ]
    },
    electrician: {
        serviceName: "Electrician Services",
        serviceImage: "/images/ac-repair-hero.png",
        basePrice: "15",
        backLink: "/electrician",
        serviceOptions: [
            { name: "Split AC Service", price: "15" },
            { name: "AC Repair & Installation", price: "25" },
            { name: "Electrical Wiring & Repairs", price: "20" },
            { name: "Fan Installation & Repair", price: "12" },
            { name: "Light Fixture Installation", price: "18" },
            { name: "Circuit Breaker Repair", price: "22" }
        ]
    },
    plumber: {
        serviceName: "Plumber Services",
        serviceImage: "/images/bathroom-cleaning.png",
        basePrice: "18",
        backLink: "/plumber",
        serviceOptions: [
            { name: "Pipe Repair & Replacement", price: "22" },
            { name: "Drain Cleaning & Unclogging", price: "18" },
            { name: "Bathroom Fitting Installation", price: "40" },
            { name: "Water Heater Service", price: "25" },
            { name: "Tap & Faucet Repair", price: "15" },
            { name: "Toilet Repair", price: "20" }
        ]
    },
    "car-wash": {
        serviceName: "Car Wash Services",
        serviceImage: "/images/car-wash-hero.png",
        basePrice: "20",
        backLink: "/car-wash",
        serviceOptions: [
            { name: "Exterior Wash & Polish", price: "20" },
            { name: "Interior Deep Cleaning", price: "30" },
            { name: "Full Service Detailing", price: "55" },
            { name: "Headlight Restoration", price: "15" },
            { name: "Engine Bay Cleaning", price: "25" },
            { name: "Ceramic Coating", price: "100" }
        ]
    },
    sports: {
        serviceName: "Sports Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "15",
        backLink: "/sports",
        serviceOptions: [
            { name: "Court Booking (1 hour)", price: "15" },
            { name: "Personal Training Session", price: "35" },
            { name: "Group Fitness Class", price: "12" },
            { name: "Equipment Rental", price: "8" },
            { name: "Swimming Pool Access", price: "10" },
            { name: "Monthly Membership", price: "100" }
        ]
    },
    events: {
        serviceName: "Event Tickets",
        serviceImage: "/images/salon-home-promo.png",
        basePrice: "30",
        backLink: "/events",
        serviceOptions: [
            { name: "Concert Tickets", price: "50" },
            { name: "Sports Event Tickets", price: "40" },
            { name: "Festival Passes", price: "75" },
            { name: "Theater & Shows", price: "30" },
            { name: "Comedy Show", price: "25" },
            { name: "VIP Event Pass", price: "150" }
        ]
    }
};

export default serviceConfigs;
