require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const path = require("path");
const morgan = require('morgan');

const app = express();

connectDB();

// Security: Use Helmet for setting secure HTTP headers
app.use(helmet());

// Middleware: Log requests for debugging (disabled in production)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiter to prevent DDoS attacks
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

app.use('/api/', apiLimiter); // Apply rate limiting to API routes

// Body parser
app.use(express.json({ limit: '10kb' })); // Limit JSON payload size
app.use(cookieParser());

// Secure static file serving with file type validation
app.use('/uploads', (req, res, next) => {
    const allowedExtensions = /\.(jpg|jpeg|png|gif|pdf)$/i; // Allowed file types
    if (req.path.match(allowedExtensions)) {
        next();
    } else {
        console.warn(`Blocked unauthorized access attempt: ${req.path}`);
        res.status(403).send('Forbidden');
    }
}, express.static(path.join(__dirname, 'uploads'), {
    dotfiles: 'ignore', // Ignore hidden files
    etag: false, // Disable ETag headers for privacy
    maxAge: '7d', // Cache files for 7 days
    extensions: false,
    fallthrough: false
}));

// Apply API routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Catch 404 and respond with a custom error
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1); // Exit the application
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit the application
});

// Server initialization
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});