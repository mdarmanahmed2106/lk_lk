import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide service name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide service category'],
        enum: ['salon', 'cleaning', 'electrician', 'plumber', 'car-wash', 'sports', 'events']
    },
    description: {
        type: String,
        required: [true, 'Please provide service description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide service price']
    },
    image: {
        type: String,
        default: '/images/default-service.png'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    discount: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ rating: -1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
