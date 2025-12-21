import express from 'express';
import {
    createBooking,
    getAllBookings,
    getMyBookings,
    getBooking,
    updateBooking,
    cancelBooking
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';

const router = express.Router();

router.post('/', optionalAuth, createBooking);
router.get('/', protect, authorize('admin'), getAllBookings);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id', protect, updateBooking);
router.delete('/:id', protect, cancelBooking);

export default router;
