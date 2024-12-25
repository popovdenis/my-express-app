const Course = require('../Course');

class CourseResource {
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
        return await Course.findOneAndDelete(courseId);
    }
}

module.exports = new CourseResource();