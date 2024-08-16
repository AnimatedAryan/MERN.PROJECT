import express from 'express';
import { authenticateToken} from '../middleware/auth.js';
import { register, login, logout } from '../controllers/authController.js';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Log in a user
router.post('/login', login);

// Log out a user
router.post('/logout', logout);

// Access protected route
router.get('/profile', authenticateToken, async (req, res) => {
    const { token } = req.cookies;

    res.json({ token, role: req.user.role, userId: req.user.id });
});

export default router;
