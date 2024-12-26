const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            return res.status(404).json({ message: 'Course entity is not found' });
        }
        res.status(200).json({ courses });
    } catch (error) {
        console.error('Error is fetching courses:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}