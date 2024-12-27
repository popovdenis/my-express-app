const Enrollment = require('../../models/Enrollment');
const EnrollmentRepository = require('../../models/EnrollmentRepository');

exports.getList = async (req, res) => {
    try {
        const { filter, sort, page = 1, limit = 10 } = req.query;

        const filters = filter ? JSON.parse(filter) : {};
        const skip = (page - 1) * limit;

        const { items, total } = await EnrollmentRepository.getList(filters, sort, skip, Number(limit));

        res.json({
            enrollments: items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ message: 'Failed to fetch enrollments', error: error.message });
    }
}