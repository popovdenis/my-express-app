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
    async getList(query, sortQuery, skip, limit) {
        const items = await CourseResource
            .find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const total = await CourseResource.countDocuments(query);

        return { items, total };
    }
}

module.exports = new CourseRepository();