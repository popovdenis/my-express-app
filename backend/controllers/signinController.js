const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../models/UserRepository');
const { needRehash } = require("../middlewares/passwordUnitils");

exports.handleSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        if (needRehash(user.password, saltRounds)) {
            const needHashedPassword = await bcrypt.hash(password, saltRounds);
            await UserRepository.updatePassword(user._id, needHashedPassword);
        }

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Sign In successful',
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};