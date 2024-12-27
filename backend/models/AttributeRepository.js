const AbstractRepository = require('./AbstractRepository');
const AttributeResource = require('./resources/AttributeResource');

class AttributeRepository extends AbstractRepository {
    constructor() {
        super(AttributeResource);
    }
    async createEntity(data) {
        return await AttributeResource.create(data);
    }
    async findByCode(title) {
        return await AttributeResource.findByCode(title);
    }
    async updateEntity(courseId, courseData) {
        return await AttributeResource.update(courseId, courseData);
    }
    async deleteEntity(courseId) {
        return await AttributeResource.delete(courseId);
    }
    processFilters(filters) {
        const query = {};
        if (filters) {
            if (filters.attributeCode) query.attributeCode = { $regex: filters.attributeCode, $options: 'i' };
            if (filters.label) query.label = { $regex: filters.label, $options: 'i' };
            if (filters.entityType) query.entityType = filters.entityType;
        }
        return query;
    }
    async getList(filters, sort, skip, limit) {
        return super.getList(
            filters,
            sort,
            skip,
            limit,
            { path: 'entityType', select: 'entityTypeCode' }
        );
    }
}

module.exports = new AttributeRepository();