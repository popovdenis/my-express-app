const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');
const UserRepository = require('../models/UserRepository');
const tokenService = require('../services/tokenService');

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserRepository.findByEmail(email);
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: config.accessCookieMaxAge,
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: config.refreshCookieMaxAge,
        });

        res.status(200).json({
            message: 'Sign In successful',
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserRepository.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged Out successfully' });
};
exports.adminSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserRepository.findByEmail(email);
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const accessToken = tokenService.generateAdminAccessToken(user);
        const refreshToken = tokenService.generateAdminRefreshToken(user);

        res.cookie('adminAccessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: config.accessCookieMaxAge,
        });
        res.cookie('refreshAdminToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: config.refreshCookieMaxAge,
        });

        res.status(200).json({
            message: 'Admin login successful',
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error('Error during admin login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
exports.checkAdminAction = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid admin token' });
        }
        if (!req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid User ID' });
        }
        const user = await UserRepository.findByIdExclPassword(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}