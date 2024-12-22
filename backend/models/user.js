const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Firstname is required'],
        },
        lastname: {
            type: String,
            required: [true, 'Lastname is required'],
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email is unique'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model('User', userSchema);