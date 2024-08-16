import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        // Set the token as HttpOnly
        res.cookie("token", token, {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'None', // Required for cross-site cookies
            maxAge: 360000 // Cookie expiration time (1 hour)
        });
        res.json({token}); // Return the user's role without the token
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
};


export const register = async (req, res) => {
    const { email, username, password, role = "user" } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ email, username, password: hashedPassword, role });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).send("Error registering user");
    }
};


export const logout = (req, res) => {
    res.clearCookie("token"); // Clear the HttpOnly cookie
    res.status(200).json({ message: "Logout successful" });
};
