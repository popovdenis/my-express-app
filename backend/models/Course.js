const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [3, 'Title must me at least 3 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters'],
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
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
            }
        ],
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        thumbnail: {
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
        },
    },
    { timestamps: true, collection: 'courses' }
);

module.exports = mongoose.model('Course', courseSchema);