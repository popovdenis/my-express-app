const bcrypt = require('bcryptjs');
const CustomerRepository = require('../models/CustomerRepository');
const CustomerResource = require('../models/resources/CustomerResource');

exports.handleSignUp = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await CustomerResource.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await CustomerRepository.createUser({
            lastname,
            firstname,
            email,
            password: await bcrypt.hash(password, await bcrypt.genSalt(10))
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};