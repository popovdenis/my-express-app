const bcrypt = require("bcryptjs");
const CustomerRepository = require('../../models/CustomerRepository');
const CustomerResource = require('../../models//resources/CustomerResource');

exports.getList = async (req, res) => {
    try {
        const { filter, sort, page = 1, limit = 10 } = req.query;

        const query = {};
        if (filter) {
            if (filter.firstname) query.firstname = { $regex: filter.firstname, $options: 'i' };
            if (filter.lastname) query.lastname = { $regex: filter.lastname, $options: 'i' };
            if (filter.email) query.email = filter.email;
        }

        const sortQuery = {};
        if (sort) {
            const [field, direction] = sort.split('_');
            sortQuery[field] = direction === 'asc' ? 1 : -1;
        }

        const skip = (page - 1) * limit;

        const {customers, total} = await CustomerRepository.getList(query, sortQuery, skip, Number(limit));

        res.json({
            customers,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Failed to fetch customers: ' + error.message });
    }
};

exports.addEntity = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await CustomerResource.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await CustomerRepository.createUser({
            firstname,
            lastname,
            email,
            role: role,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getEntity = async (req, res) => {
    try {
        const user = await CustomerResource.findByIdExclPassword(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateEntity = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, role } = req.body;

        const user = await CustomerResource.findByIdExclPassword(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await CustomerRepository.updateUser(id, user);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteEntity = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await CustomerRepository.deleteUser(id);

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

        const user = await CustomerResource.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role' });
    }
};