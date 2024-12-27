const AttributeResource = require('./resources/AttributeResource');
const AdminUserResource = require("./resources/AdminUserResource");

class AttributeRepository {
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
    async getList(query, sortQuery, skip, limit) {
        console.log(sortQuery)
        const items = await AttributeResource
            .find(query)
            .populate('entity_type', 'entity_type_code')
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const total = await AttributeResource.countDocuments(query);

        return { items, total };
    }
}

module.exports = new AttributeRepository();