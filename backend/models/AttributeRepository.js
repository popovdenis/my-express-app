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
            if (filters.attribute_code) query.attribute_code = { $regex: filters.attribute_code, $options: 'i' };
            if (filters.label) query.label = { $regex: filters.label, $options: 'i' };
            if (filters.entity_type) query.entity_type = filters.entity_type;
        }
        return query;
    }
    async getList(filters, sort, skip, limit) {
        return super.getList(
            filters,
            sort,
            skip,
            limit,
            { path: 'entity_type', select: 'entity_type_code' }
        );
    }
}

module.exports = new AttributeRepository();