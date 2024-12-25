const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [3, 'Title must me at least 3 characters'],
            maxlength: [100, 'Firstname cannot exceed 50 characters']
        },
        description: {
            type: String,
            required: false
        },
        duration: {
            type: String,
            required: false
        },
        level: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }, { timestamps: true, collection: 'courses' }
);

module.exports = mongoose.model('Course', courseSchema);