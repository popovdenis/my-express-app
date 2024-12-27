const Enrollment = require('../models/Enrollment');
const EnrollmentRepository = require('../models/EnrollmentRepository');

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
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const existingEnrollment = await Enrollment.findOne({ course: courseId, user: userId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course.' });
        }

        const enrollment = await Enrollment.create({
            course: courseId,
            customer: userId,
            status: 'started',
        });

        res.status(201).json({ message: 'Successfully enrolled in course.', enrollment });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Failed to enroll in course.' });
    }
};
exports.updateEnrollmentStatus = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { status } = req.body;

        const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { status }, { new: true });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        res.status(200).json({ message: 'Enrollment status updated.', enrollment });
    } catch (error) {
        console.error('Error updating enrollment status:', error);
        res.status(500).json({ message: 'Failed to update enrollment status.' });
    }
};
exports.getCustomerEnrollmentStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const enrollments = await Enrollment.find({ customer: userId }).populate('course', 'title description image');
        res.status(200).json({ enrollments: enrollments });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ message: 'Failed to fetch enrollments.' });
    }
};