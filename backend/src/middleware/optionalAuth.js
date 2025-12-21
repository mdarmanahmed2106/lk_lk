import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        }
    } catch (error) {
        // Silently fail - guest booking is allowed
        console.log('Optional auth failed, proceeding as guest');
    }

    next();
};
