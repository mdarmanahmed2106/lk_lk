// Service configurations for all booking pages
// Prices aligned with database
export const serviceConfigs = {
    salon: {
        serviceName: "Salon Services",
        serviceImage: "/images/womens-salon-hero.png",
        basePrice: "299",
        backLink: "/salon",
        serviceOptions: [
            { name: "Haircut & Styling", price: "299" },
            { name: "Hair Coloring", price: "1499" },
            { name: "Facial & Cleanup", price: "799" },
            { name: "Hair Spa Treatment", price: "999" }
        ]
    },
    cleaning: {
        serviceName: "Cleaning Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "499",
        backLink: "/cleaning",
        serviceOptions: [
            { name: "Deep House Cleaning", price: "1499" },
            { name: "Kitchen Cleaning", price: "699" },
            { name: "Bathroom Cleaning", price: "499" },
            { name: "Office Cleaning", price: "2499" }
        ]
    },
    electrician: {
        serviceName: "Electrician Services",
        serviceImage: "/images/ac-repair-hero.png",
        basePrice: "299",
        backLink: "/electrician",
        serviceOptions: [
            { name: "Electrical Repair", price: "499" },
            { name: "Wiring & Rewiring", price: "2499" },
            { name: "Fan Installation", price: "299" },
            { name: "Light Fixture Installation", price: "399" }
        ]
    },
    plumber: {
        serviceName: "Plumber Services",
        serviceImage: "/images/bathroom-cleaning.png",
        basePrice: "599",
        backLink: "/plumber",
        serviceOptions: [
            { name: "Plumbing Repair", price: "599" },
            { name: "Pipe Installation", price: "1299" },
            { name: "Bathroom Fitting", price: "2999" },
            { name: "Drainage Cleaning", price: "799" }
        ]
    },
    "car-wash": {
        serviceName: "Car Wash Services",
        serviceImage: "/images/car-wash-hero.png",
        basePrice: "599",
        backLink: "/car-wash",
        serviceOptions: [
            { name: "Car Wash & Detailing", price: "799" },
            { name: "Interior Cleaning", price: "599" },
            { name: "Ceramic Coating", price: "4999" },
            { name: "Paint Protection", price: "3499" }
        ]
    },
    sports: {
        serviceName: "Sports Services",
        serviceImage: "/images/cleaning-service-hero.png",
        basePrice: "499",
        backLink: "/sports",
        serviceOptions: [
            { name: "Cricket Coaching", price: "999" },
            { name: "Football Training", price: "899" },
            { name: "Badminton Court Booking", price: "499" },
            { name: "Gym Membership", price: "1999" }
        ]
    },
    events: {
        serviceName: "Event Tickets",
        serviceImage: "/images/salon-home-promo.png",
        basePrice: "499",
        backLink: "/events",
        serviceOptions: [
            { name: "Concert Tickets", price: "1499" },
            { name: "Sports Event Tickets", price: "999" },
            { name: "Festival Passes", price: "2499" },
            { name: "Theater Shows", price: "799" }
        ]
    }
};

export default serviceConfigs;
