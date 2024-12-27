const Enrollment = require('../models/Enrollment');

exports.getList = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        if (!enrollments) {
            return res.status(404).json({ message: 'Enrollments are not found' });
        }
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error('Error is fetching enrollments:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}