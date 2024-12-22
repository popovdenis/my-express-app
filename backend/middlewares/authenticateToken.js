const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Token not found in Authorization header' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
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