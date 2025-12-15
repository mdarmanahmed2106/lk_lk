import express from 'express';
import {
    getAllServices,
    getServicesByCategory,
    getService,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getService);

// Admin routes
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);
router.patch('/:id/toggle', protect, authorize('admin'), toggleServiceStatus);

export default router;
