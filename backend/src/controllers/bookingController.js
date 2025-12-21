import Booking from '../models/Booking.js';


export const createBooking = async (req, res, next) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            serviceType,
            serviceOption,
            date,
            time,
            address,
            notes,
            totalPrice
        } = req.body;

        console.log('📥 Received booking request:', {
            customerName,
            customerEmail,
            serviceType,
            serviceOption,
            date,
            time
        });

        const booking = await Booking.create({
            user: req.user?._id, 
            customerName,
            customerEmail,
            customerPhone,
            serviceType,
            serviceOption,
            date,
            time,
            address,
            notes,
            totalPrice
        });

        console.log('✅ Booking saved to MongoDB:', {
            id: booking._id,
            customerName: booking.customerName,
            serviceType: booking.serviceType,
            status: booking.status
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('❌ Error creating booking:', error.message);
        next(error);
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').sort('-createdAt');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user && booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user && booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this booking'
            });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user && booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};
