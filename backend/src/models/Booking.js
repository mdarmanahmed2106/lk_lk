import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Allow guest bookings
    },
    // Customer Information (for guest bookings)
    customerName: {
        type: String,
        required: [true, 'Please provide customer name']
    },
    customerEmail: {
        type: String,
        required: [true, 'Please provide customer email'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    customerPhone: {
        type: String,
        required: [true, 'Please provide customer phone number']
    },
    // Service Details
    serviceType: {
        type: String,
        required: [true, 'Please provide service type'],
        enum: ['salon', 'cleaning', 'electrician', 'plumber', 'car-wash', 'sports', 'events']
    },
    serviceOption: {
        type: String,
        required: [true, 'Please provide service option']
    },
    // Booking Details
    date: {
        type: Date,
        required: [true, 'Please provide booking date']
    },
    time: {
        type: String,
        required: [true, 'Please provide booking time']
    },
    address: {
        type: String,
        required: [true, 'Please provide service address']
    },
    notes: {
        type: String,
        default: ''
    },
    // Pricing
    totalPrice: {
        type: Number,
        required: [true, 'Please provide total price']
    },
    // Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Index for faster queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ serviceType: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
