import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import problemRoutes from './routes/problems.js';
import submissionRoutes from './routes/submissionroutes.js';
import {authenticateToken } from './middleware/auth.js';


// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const allowedOrigins = JSON.parse(process.env.CORS_ALLOWED_ORIGINS|| '[]');



// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use(cors({
    origin: allowedOrigins, // Update with your client URL
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
// In your Express app (e.g., app.js or server.js)
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api', submissionRoutes);
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  const user = req.user;
  res.json({ user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
