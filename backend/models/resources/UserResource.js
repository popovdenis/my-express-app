const User = require('../User');

class UserResource {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    async create(userData) {
        return await User.create(userData);
    }
    async update(userId, updates) {
        return await User.findByIdAndUpdate(userId, updates, { new: true });
    }
    async updatePassword(userId, newPassword) {
        return await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
    }
}

module.exports = new UserResource();