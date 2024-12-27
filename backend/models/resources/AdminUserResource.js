const AdminUser = require('../AdminUser');

class AdminUserResource {
    async findByIdExclPassword(userId) {
        return AdminUser.findById(userId).select('-password');
    }
    async findByEmail(email) {
        return await AdminUser.findOne({ email });
    }
    async create(userData) {
        return await AdminUser.create(userData);
    }
    async update(userId, updates) {
        return await AdminUser.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    }
    async delete(userId) {
        return await AdminUser.findByIdAndDelete(userId);
    }
}

module.exports = new AdminUserResource();