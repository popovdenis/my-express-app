const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');

const authenticateAdminToken = (req, res, next) => {
    const token = req.cookies.adminAccessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No admin token provided' });
    }

    try {
        req.user = jwt.verify(token, config.adminAccessTokenSecret);
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