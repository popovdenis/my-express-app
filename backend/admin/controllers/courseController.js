const Course = require('../../models/Course');
const CourseRepository = require('../../models/CourseRepository');

exports.getList = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Failed to fetch courses' });
    }
};
exports.addEntity = async (req, res) => {
    try {
        const { title, description, duration, level } = req.body;

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
            level
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
        res.status(200).json({ course });
    } catch (error) {
        console.error('Error getting course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateEntity = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration, level } = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        course.title = title || course.title;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.level = level || course.level;

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