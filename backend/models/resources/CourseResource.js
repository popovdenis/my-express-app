const Course = require('../Course');

class CourseResource {
    async countDocuments(query) {
        return await Course.countDocuments(query);
    }
    find(query) {
        return Course.find(query);
    }
    async findByTitle(title) {
        return await Course.findOne({ title });
    }
    async create(courseData) {
        return await Course.create(courseData);
    }
    async update(courseId, updates) {
        return await Course.findByIdAndUpdate(courseId, updates, { new: true, runValidators: true });
    }
    async delete(courseId) {
        return await Course.findByIdAndDelete(courseId);
    }
}

module.exports = new CourseResource();