const User = require('../User');

class UserResource {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    async create(userData) {
        return await User.create(userData);
    }
    async updatePassword(userId, newPassword) {
        return await User.findByIdAndUpdate(userId, { password_hash: newPassword }, { new: true });
    }
}

module.exports = new UserResource();