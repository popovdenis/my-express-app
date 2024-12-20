const jwt = require('jsonwebtoken');

// Secret key for signing tokens (store this securely in production)
const SECRET_KEY = 'your-secret-key';

// Middleware to verify a token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Function to generate a new token
const generateToken = (user) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Token valid for 1 hour
};

module.exports = {
    authenticateToken,
    generateToken,
};