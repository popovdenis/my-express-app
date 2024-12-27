const Attribute = require('../Attribute');

class AttributeResource {
    async countDocuments(query) {
        return await Attribute.countDocuments(query);
    }
    find(query) {
        return Attribute.find(query);
    }
    async findByCode(code) {
        return await Attribute.findOne({ attributeCode: code });
    }
    async create(entityData) {
        return await Attribute.create(entityData);
    }
    async update(courseId, updates) {
        return await Attribute.findByIdAndUpdate(courseId, updates, { new: true, runValidators: true });
    }
    async delete(courseId) {
        return await Attribute.findOneAndDelete(courseId);
    }
}

module.exports = new AttributeResource();