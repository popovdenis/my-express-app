const mongoose = require('mongoose');

const courseEnrollmentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        enrollmentStatus: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: 'course_enrollment' },
);
courseEnrollmentSchema.index({ enrollmentStatus: 1 });
courseEnrollmentSchema.index({ course: 1, student: 1 });

module.exports = mongoose.model('CourseEnrollment', courseEnrollmentSchema);