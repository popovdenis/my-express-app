const AttributeResource = require('./resources/AttributeResource');

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
}

module.exports = new AttributeRepository();