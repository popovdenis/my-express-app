const AdminUser = require('../../models/AdminUser');

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send('Not authorized');
        }

        const user = await AdminUser.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.role !== 'admin') {
            return res.status(401).send('Forbidden: Admin access only');
        }

        next();
    } catch (e) {
        console.error('Error in isAdmin middleware:', e);
        res.status(500).json({ message: 'Server error', error: e });
    }
}

module.exports = isAdmin;