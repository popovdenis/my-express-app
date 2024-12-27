const config = require('../../config/jwt.config');
const UserResource = require('../../models/resources/UserResource');
const tokenService = require('../../services/tokenService');

exports.adminSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserResource.findByEmail(email);
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
        const user = await UserResource.findByIdExclPassword(req.user.id);
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
exports.adminLogout = async (req, res) => {
    res.clearCookie('adminAccessToken');
    res.clearCookie('refreshAdminToken');
    res.status(200).json({ message: 'Logged Out successfully' });
};
