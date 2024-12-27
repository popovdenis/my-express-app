const CustomerResource = require('./resources/CustomerResource');
const Customer = require('./Customer');

class CustomerRepository {
    async createUser(data) {
        return await CustomerResource.create(data);
    }
    async updateUser(userId, newPassword) {
        return await CustomerResource.update(userId, newPassword);
    }
    async deleteUser(userId) {
        return await CustomerResource.delete(userId);
    }
    async getList(query, sortQuery, skip, limit) {
        const items = await CustomerResource
            .find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const total = await CustomerResource.countDocuments(query);

        return { items, total };
    }
}

module.exports = new CustomerRepository();