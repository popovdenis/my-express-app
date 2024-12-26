const UserRepository = require('../models/UserRepository');
const tokenService = require("../services/tokenService");

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await UserRepository.findByIdExclPassword(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateCurrentUser = async (req, res) => {
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
        const token = tokenService.generateRefreshToken(updatedUser);

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