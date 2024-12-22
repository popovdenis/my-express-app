const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.handleSignUp = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};