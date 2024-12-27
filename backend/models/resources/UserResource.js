const User = require('../User');

class UserResource {
    async findAllExclPassword() {
        return await User.findById().select('-password');
    }
    async findByIdExclPassword(userId) {
        return User.findById(userId).select('-password');
    }
    async findByIdAndUpdate(userId, updates) {
        return await User.findByIdAndUpdate(userId, updates, { new: true });
    }
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    async create(userData) {
        return await User.create(userData);
    }
    async update(userId, updates) {
        return await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    }
    async updatePassword(userId, newPassword) {
        return await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
    }
    async delete(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserResource();