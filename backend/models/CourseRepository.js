const AbstractRepository = require('./AbstractRepository');
const CourseResource = require('./resources/CourseResource');

class CourseRepository extends AbstractRepository {
    constructor() {
        super(CourseResource);
    }
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
    processFilters(filters) {
        const query = {};
        if (filters) {
            if (filters.title) query.title = { $regex: filters.title, $options: 'i' };
            if (filters.level) query.level = filters.level;
        }
        return query;
    }
    async getList(filters, sort, skip, limit) {
        return super.getList(
            filters,
            sort,
            skip,
            limit
        );
    }
}

module.exports = new CourseRepository();