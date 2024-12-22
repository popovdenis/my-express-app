const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Firstname is required'],
            minlength: [3, 'Firstname must me at least 3 characters'],
            maxlength: [50, 'Firstname cannot exceed 50 characters']
        },
        lastname: {
            type: String,
            required: [true, 'Lastname is required'],
            minlength: [3, 'Lastname must me at least 3 characters'],
            maxlength: [50, 'Lastname cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email is unique'],
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);