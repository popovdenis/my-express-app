const Customer = require('../Customer');

class CustomerResource {
    async countDocuments(query) {
        return await Customer.countDocuments(query);
    }
    find(query) {
        return Customer.find(query);
    }
    async findAllExclPassword() {
        return await Customer.find().select('-password');
    }
    async findByIdExclPassword(customerId) {
        return Customer.findById(customerId).select('-password');
    }
    async findByIdAndUpdate(customerId, updates) {
        return await Customer.findByIdAndUpdate(customerId, updates, { new: true });
    }
    async findByEmail(email) {
        return await Customer.findOne({ email });
    }
    async create(userData) {
        return await Customer.create(userData);
    }
    async update(customerId, updates) {
        return await Customer.findByIdAndUpdate(customerId, updates, { new: true, runValidators: true });
    }
    async delete(customerId) {
        return await Customer.findByIdAndDelete(customerId);
    }
}

module.exports = new CustomerResource();