const bcrypt = require("bcryptjs");
const Course = require('../../models/Course');
const UserRepository = require('../../models/UserRepository');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().select('-password');
        res.json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Failed to fetch courses' });
    }
};
exports.addCourse = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        // const product = new Product({
        //     name,
        //     price,
        //     description,
        // });
        //
        // await product.save();
        // res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
};