const UserRepository = require('../models/UserRepository');
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { firstname, lastname, email, password } = req.body;

    if (!firstname && lastname && !email && !password) {
        return res.status(400).json({ message: 'No data provided for update' });
    }

    try {
        const updates = {};
        if (firstname) updates.firstname = firstname;
        if (lastname) updates.lastname = lastname;
        if (email) updates.email = email;

        if (password) {
            const bcrypt = require('bcryptjs');
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
            updates.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await UserRepository.updateUser(userId, updates);
        const payload = { id: updatedUser._id, email: updatedUser.email };
        const token = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.accessTokenExpiresIn });

        res.status(200).json({
            message: 'User profile updated successfully',
            token,
            user: {
                id: updatedUser._id,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
            },
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};