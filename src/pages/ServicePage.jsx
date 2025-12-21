import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';
import GlassCard from '../components/ui/GlassCard';

const ServicePage = ({
    title,
    description,
    heroImage,
    benefits = [],
    services = [],
    ctaText = "Book Now",
    bookingLink = "#"
}) => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
                {/* Background gradient */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-br from-lk-teal/20 to-lk-mustard/20 rounded-full blur-3xl"
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Back button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-lk-teal hover:text-lk-mustard transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-lk-teal to-lk-mustard bg-clip-text text-transparent"
                            >
                                {title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-gray-600 mb-8"
                            >
                                {description}
                            </motion.p>

                            {/* Benefits */}
                            {benefits.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="space-y-3"
                                >
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="text-lk-teal mt-1 flex-shrink-0" size={20} />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Right: Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <img
                                src={heroImage}
                                alt={title}
                                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            {services.length > 0 && (
                <section className="py-16 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-lk-text mb-4">
                                Popular Services
                            </h2>
                            <p className="text-gray-600 mb-12">
                                Choose from our most requested services
                            </p>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {services.map((service, idx) => {
                                // Extract serviceType from bookingLink (e.g., "/salon/book" -> "salon")
                                const serviceType = bookingLink.split('/')[1];
                                return (
                                    <ScrollReveal key={idx} delay={idx * 0.1}>
                                        <ServiceCard {...service} serviceType={serviceType} />
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-lk-teal/5 to-lk-mustard/5">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <GlassCard className="p-8 md:p-12" intensity="medium">
                            <h2 className="text-3xl md:text-4xl font-bold text-lk-text mb-4">
                                Ready to get started?
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Book your service now and experience professional quality at your doorstep
                            </p>
                            <Link
                                to={bookingLink}
                                className="inline-block px-8 py-4 bg-gradient-to-r from-lk-teal to-lk-mustard text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                {ctaText}
                            </Link>
                        </GlassCard>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
