const UserResource = require('./resources/UserResource');

class UserRepository {
    async createUser(data) {
        return await UserResource.create(data);
    }
    async findByEmail(email) {
        return await UserResource.findByEmail(email);
    }
    async findByIdExclPassword(userId) {
        return UserResource.findByIdExclPassword(userId);
    }
    async updatePassword(userId, newPassword) {
        return await UserResource.updatePassword(userId, newPassword);
    }
    async updateUser(userId, newPassword) {
        return await UserResource.update(userId, newPassword);
    }
}

module.exports = new UserRepository();