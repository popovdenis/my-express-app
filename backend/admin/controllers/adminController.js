const User = require('../../models/User');
// const Product = require('../models/Product');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

exports.AddCourse = async (req, res) => {
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

exports.AddUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true } // Возвращаем обновлённый документ
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role' });
    }
};