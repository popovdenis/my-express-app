const Attribute = require('../Attribute');

class AttributeResource {
    async findByCode(code) {
        return await Attribute.findOne({ attribute_code: code });
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