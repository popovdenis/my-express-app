const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema(
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }, { timestamps: true, collection: 'customer_entity' }
);
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Customer', customerSchema);