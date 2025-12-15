import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res, next) => {
    try {
        const { category, active } = req.query;

        let query = {};
        if (category) query.category = category;
        if (active !== undefined) query.isActive = active === 'true';

        const services = await Service.find(query).sort({ category: 1, name: 1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
export const getServicesByCategory = async (req, res, next) => {
    try {
        const services = await Service.find({
            category: req.params.category,
            isActive: true
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle service active status
// @route   PATCH /api/services/:id/toggle
// @access  Private/Admin
export const toggleServiceStatus = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        service.isActive = !service.isActive;
        await service.save();

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        next(error);
    }
};
