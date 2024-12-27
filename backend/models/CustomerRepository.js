const CustomerResource = require('./resources/CustomerResource');

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
}

module.exports = new CustomerRepository();