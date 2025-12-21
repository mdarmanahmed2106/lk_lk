import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d' // Default to 30 days if not set
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            phone: req.body.phone
        };

        const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add address
// @route   POST /api/auth/addresses
// @access  Private
export const addAddress = async (req, res, next) => {
    try {
        const { label, addressLine, isDefault } = req.body;

        const user = await User.findById(req.user._id);

        // If this is set as default, unset other defaults
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push({ label, addressLine, isDefault });
        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update address
// @route   PUT /api/auth/addresses/:id
// @access  Private
export const updateAddress = async (req, res, next) => {
    try {
        const { label, addressLine, isDefault } = req.body;
        const user = await User.findById(req.user._id);

        const address = user.addresses.id(req.params.id);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // If this is set as default, unset other defaults
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        address.label = label || address.label;
        address.addressLine = addressLine || address.addressLine;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete address
// @route   DELETE /api/auth/addresses/:id
// @access  Private
export const deleteAddress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        user.addresses = user.addresses.filter(
            addr => addr._id.toString() !== req.params.id
        );

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Set default address
// @route   PATCH /api/auth/addresses/:id/default
// @access  Private
export const setDefaultAddress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        // Unset all defaults
        user.addresses.forEach(addr => addr.isDefault = false);

        // Set the specified address as default
        const address = user.addresses.id(req.params.id);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        address.isDefault = true;
        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

