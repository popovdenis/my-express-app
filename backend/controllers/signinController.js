const { generateToken } = require('../middlewares/authMiddleware');
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'your-secret-token';

exports.handleSignIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    // Simulate user authentication (replace with database logic)
    if (email === 'denispopov2112@gmail.com' && password === '123') {
        const user = { id: 1, email, firstname: 'Denis', lastname: 'Popov' };
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Sign In successful', token, user });
    }

    res.status(401).json({ message: 'Invalid email or password' });
};