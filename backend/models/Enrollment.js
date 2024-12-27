const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        status: {
            type: String,
            enum: ['started', 'stopped', 'completed'],
            default: 'started',
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
        completedAt: {
            type: Date,
        },
    },
    { timestamps: true, collection: 'course_enrollments' }
);
enrollmentSchema.index({ enrollmentStatus: 1 });
enrollmentSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);