import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(403).json({ error: "Invalid token" });
        }
        const _user = await User.findById(user.userId);
        if (!_user) {
            console.log('User not found');
            return res.status(401).json({ error: "User not found" });
        }

        req.user = _user;
        next();
    });
};

/*export const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};
*/