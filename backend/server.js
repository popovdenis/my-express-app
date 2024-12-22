require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Import all routes

connectDB();

// Middleware
app.use(errorHandler);
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use('/api', routes); // Prefix all routes with /api

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});