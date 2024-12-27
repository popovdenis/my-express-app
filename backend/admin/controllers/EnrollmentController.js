const CourseEnrollment = require('../../models/CourseEnrollment');

exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const existingEnrollment = await CourseEnrollment.findOne({ course: courseId, user: userId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course.' });
        }

        const enrollment = await CourseEnrollment.create({
            course: courseId,
            user: userId,
            status: 'started',
        });

        res.status(201).json({ message: 'Successfully enrolled in course.', enrollment });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Failed to enroll in course.' });
    }
};

exports.getUserEnrollments = async (req, res) => {
    try {
        const userId = req.user._id;

        const enrollments = await CourseEnrollment.find({ user: userId }).populate('course', 'title description image');
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ message: 'Failed to fetch enrollments.' });
    }
};

exports.updateEnrollmentStatus = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { status } = req.body;

        const enrollment = await CourseEnrollment.findByIdAndUpdate(enrollmentId, { status }, { new: true });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found.' });
        }

        res.status(200).json({ message: 'Enrollment status updated.', enrollment });
    } catch (error) {
        console.error('Error updating enrollment status:', error);
        res.status(500).json({ message: 'Failed to update enrollment status.' });
    }
};