const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');

const authenticateAdminToken = (req, res, next) => {
    const token = req.cookies.adminAccessToken;

    console.log('Checking admin token...');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No admin token provided' });
    }

    try {
        console.log('Token is found.');
        req.user = jwt.verify(token, config.adminAccessTokenSecret);
        console.log('User role is ' + req.user.role);
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Message: '
                + err.message
                + '; token: '
                + token
                + ';secret: '
                + process.env.JWT_SECRET
                + '; headers: '
                + JSON.stringify(req.headers)
        });
    }
};

module.exports = authenticateAdminToken;