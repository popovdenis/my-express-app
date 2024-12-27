const Enrollment = require('../Enrollment');

class EnrollmentResource {
    async countDocuments(query) {
        return await Enrollment.countDocuments(query);
    }
    find(query) {
        return Enrollment.find(query);
    }
    async create(courseData) {
        return await Enrollment.create(courseData);
    }
    async update(courseId, updates) {
        return await Enrollment.findByIdAndUpdate(courseId, updates, { new: true, runValidators: true });
    }
    async delete(courseId) {
        return await Enrollment.findByIdAndDelete(courseId);
    }
}

module.exports = new EnrollmentResource();