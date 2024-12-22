const UserRepository = require('../models/UserRepository');

exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ message: 'No data provided for update' });
    }

    try {
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;

        if (password) {
            const bcrypt = require('bcryptjs');
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
            updates.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await UserRepository.updateUser(userId, updates);

        res.status(200).json({
            message: 'User profile updated successfully',
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