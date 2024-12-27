const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [3, 'Title must be at least 3 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters'],
            index: true,
        },
        description: {
            type: String,
            required: false,
        },
        duration: {
            type: String,
            required: false,
        },
        level: {
            type: String,
            required: false,
            index: true,
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
                index: true,
            }
        ],
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
            index: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
            index: true,
        },
        image: {
            type: String,
            required: false,
        },
        enrolledStudents: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    { timestamps: true, collection: 'courses' }
);

courseSchema.index({ title: 1, isActive: 1 });
courseSchema.index({ instructor: 1, category: 1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Course', courseSchema);