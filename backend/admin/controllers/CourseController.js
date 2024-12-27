const Course = require('../../models/Course');
const Attribute = require('../../models/Attribute');
const CourseRepository = require('../../models/CourseRepository');

const getCourseAttributes = async () => {
    return Attribute.aggregate([
        {
            $lookup: {
                from: 'eav_entity_type',
                localField: 'entityType',
                foreignField: '_id',
                as: 'entityTypeDetails',
            },
        },
        {$unwind: '$entityTypeDetails'},
        {$match: {'entityTypeDetails.entityTypeCode': 'course'}},
        {
            $project: {
                _id: 1,
                attributeCode: 1,
                label: 1,
                options: 1,
                isRequired: 1,
                entityTypeCode: '$entityTypeDetails.entityTypeCode',
            },
        },
    ]);
};

exports.getList = async (req, res) => {
    try {
        const { filter, sort, page = 1, limit = 10 } = req.query;

        const filters = filter ? JSON.parse(filter) : {};
        const skip = (page - 1) * limit;

        const { items, total } = await CourseRepository.getList(filters, sort, skip, Number(limit));

        res.json({
            courses: items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
};
exports.addEntity = async (req, res) => {
    try {
        console.log(req.body);
        const { title, description, duration, level, image } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Please fill the required fields' });
        }

        const existingCourse = await CourseRepository.findByTitle(title);
        if (existingCourse) {
            return res.status(400).json({ message: 'The course with the sam title already exists' });
        }

        const newEntity = await CourseRepository.createCourse({
            title,
            description,
            duration,
            level,
            image
        });

        res.status(201).json({ message: 'Course created successfully', course: newEntity });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getEntity = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const attributes = await getCourseAttributes();

        res.status(200).json({ course, attributes });
    } catch (error) {
        console.error('Error getting course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateEntity = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            duration,
            level,
            image
        } = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        course.title = title || course.title;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.level = level || course.level;
        course.image = image || course.image;

        const updatedEntity = await CourseRepository.updateCourse(id, course);
        res.status(200).json({ message: 'Course updated successfully', course: updatedEntity });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deleteEntity = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await CourseRepository.deleteCourse(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Failed to delete course' });
    }
};