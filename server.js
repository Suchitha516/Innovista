// server.js - Main entry point for the backend

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public folder

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college-tour-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Import routes
const infoRoutes = require('./routes/info');
const mapRoutes = require('./routes/map');
const eventsRoutes = require('./routes/events');
const facilitiesRoutes = require('./routes/facilities');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/info', infoRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/auth', authRoutes);

// Serve the main HTML file for any other route (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));