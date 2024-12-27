const AdminUserResource = require('./resources/AdminUserResource');

class AdminUserRepository {
    async createUser(data) {
        return await AdminUserResource.create(data);
    }
    async updateUser(userId, newPassword) {
        return await AdminUserResource.update(userId, newPassword);
    }
    async deleteUser(userId) {
        return await AdminUserResource.delete(userId);
    }
    async getList(query, sortQuery, skip, limit) {
        const items = await AdminUserResource
            .find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const total = await AdminUserResource.countDocuments(query);

        return { items, total };
    }
}

module.exports = new AdminUserRepository();