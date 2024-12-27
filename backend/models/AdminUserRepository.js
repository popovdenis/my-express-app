const AbstractRepository = require('./AbstractRepository');
const AdminUserResource = require('./resources/AdminUserResource');

class AdminUserRepository extends AbstractRepository {
    constructor() {
        super(AdminUserResource);
    }
    async createUser(data) {
        return await AdminUserResource.create(data);
    }
    async updateUser(userId, newPassword) {
        return await AdminUserResource.update(userId, newPassword);
    }
    async deleteUser(userId) {
        return await AdminUserResource.delete(userId);
    }
    processFilters(filters) {
        const query = {};
        if (filters) {
            if (filter.firstname) query.firstname = { $regex: filter.firstname, $options: 'i' };
            if (filter.lastname) query.lastname = { $regex: filter.lastname, $options: 'i' };
            if (filter.email) query.email = filter.email;
        }
        return query;
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