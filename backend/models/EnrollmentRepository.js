const AbstractRepository = require('./AbstractRepository');
const EnrollmentResource = require('./resources/EnrollmentResource');

class EnrollmentRepository extends AbstractRepository {
    constructor() {
        super(EnrollmentResource);
    }
    async createEnrollment(data) {
        return await EnrollmentResource.create(data);
    }
    async updateEnrollment(entityId, entityData) {
        return await EnrollmentResource.update(entityId, entityData);
    }
    async deleteEnrollment(entityId) {
        return await EnrollmentResource.delete(entityId);
    }
    processFilters(filters) {
        const query = {};
        if (filters) {
            // if (filters.title) query.title = { $regex: filters.title, $options: 'i' };
            // if (filters.level) query.level = filters.level;
        }
        return query;
    }
    async getList(filters, sort, skip, limit) {
        return super.getList(
            filters,
            sort,
            skip,
            limit
        );
    }
}

module.exports = new EnrollmentRepository();