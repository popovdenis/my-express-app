const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(205).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Logged in user");
        console.log(req.user);
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

module.exports = authenticateToken;