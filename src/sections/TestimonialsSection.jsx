import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
    {
        name: "Anjali Deshmukh",
        service: "Home Cleaning",
        review: "Absolutely fantastic service! The cleaning team was professional, thorough, and left my home sparkling. I've been using Local Konnect for 6 months now and couldn't be happier.",
        rating: 5,
        avatar: "/images/customer-avatar-1.png",
        verified: true
    },
    {
        name: "Rajesh Kumar",
        service: "AC Repair",
        review: "Quick response time and excellent work. The technician diagnosed the issue immediately and had my AC running perfectly within an hour. Highly recommend!",
        rating: 5,
        avatar: "/images/customer-avatar-2.png",
        verified: true
    },
    {
        name: "Meera Iyer",
        service: "Salon at Home",
        review: "The stylist was amazing! She listened to exactly what I wanted and delivered beyond my expectations. So convenient to have salon services at home.",
        rating: 5,
        avatar: "/images/customer-avatar-3.png",
        verified: true
    },
    {
        name: "Arjun Patel",
        service: "Plumbing",
        review: "Professional and reliable. Fixed my leaking pipes quickly and explained everything clearly. Fair pricing and great service.",
        rating: 5,
        avatar: "/images/customer-avatar-4.png",
        verified: true
    },
    {
        name: "Priya Sharma",
        service: "Painting",
        review: "Transformed my living room completely! The painters were skilled, clean, and finished on time. The quality of work exceeded my expectations.",
        rating: 5,
        avatar: "/images/customer-avatar-5.png",
        verified: true
    },
    {
        name: "Vikram Singh",
        service: "Electrician",
        review: "Excellent electrical work. The electrician was knowledgeable, safety-conscious, and solved my wiring issues efficiently. Will definitely use again!",
        rating: 5,
        avatar: "/images/customer-avatar-6.png",
        verified: true
    }
];

const TestimonialCard = ({ name, service, review, rating, avatar, verified, delay }) => (
    <ScrollReveal delay={delay}>
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group h-full"
        >
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lk-teal to-lk-mustard rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>

            <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="text-lk-teal/20 mb-4" size={32} />

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow italic">
                    "{review}"
                </p>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: delay + (i * 0.1), type: "spring" }}
                        >
                            <Star size={16} className="fill-amber-400 text-amber-400" />
                        </motion.div>
                    ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-lk-teal/30"
                        />
                        {verified && (
                            <div className="absolute -bottom-1 -right-1 bg-lk-teal rounded-full p-0.5">
                                <BadgeCheck size={16} className="text-white" />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <div className="font-bold text-lk-text flex items-center gap-1">
                            {name}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{service}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    </ScrollReveal>
);

const TestimonialsSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lk-teal/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lk-mustard/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4"
                        >
                            <div className="flex items-center gap-2 bg-lk-teal/10 px-4 py-2 rounded-full">
                                <Star className="fill-amber-400 text-amber-400" size={20} />
                                <span className="text-sm font-bold text-lk-teal">4.9/5 Average Rating</span>
                            </div>
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Loved by <span className="bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent">50,000+</span> customers
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our customers have to say about their experience.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item, idx) => (
                        <TestimonialCard key={idx} {...item} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

