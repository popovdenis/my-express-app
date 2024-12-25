const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');

const authenticateCustomer = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        req.user = jwt.verify(token, config.accessTokenSecret);
        next();
    } catch (err) {
        return res.status(403).json({
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

module.exports = authenticateCustomer;