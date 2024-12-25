const CourseResource = require('./resources/CourseResource');

class CourseRepository {
    async createCourse(data) {
        return await CourseResource.create(data);
    }
    async findByTitle(title) {
        return await CourseResource.findByTitle(title);
    }
    async updateCourse(courseId, courseData) {
        return await CourseResource.update(courseId, courseData);
    }
    async deleteCourse(courseId) {
        return await CourseResource.delete(courseId);
    }
}

module.exports = new CourseRepository();