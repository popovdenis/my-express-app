const { generateToken } = require('../middlewares/authMiddleware');

exports.handleSignIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    // Simulate user authentication (replace with database logic)
    if (email === 'test@example.com' && password === 'password123') {
        const user = { email }; // Payload to include in the token
        const token = generateToken(user);
        return res.status(200).json({ message: 'Sign In successful', token });
    }

    res.status(401).json({ message: 'Invalid email or password' });
};