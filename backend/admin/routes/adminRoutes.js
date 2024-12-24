const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateAdminToken } = require('../../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/users', authenticateAdminToken, isAdmin, adminController.getAllUsers);
router.post('/users', authenticateAdminToken, isAdmin, adminController.addUser);
router.get('/users/:id', authenticateAdminToken, isAdmin, adminController.getUser);
router.put('/users/:id', authenticateAdminToken, isAdmin, adminController.updateUser);
router.delete('/users/:id', authenticateAdminToken, isAdmin, adminController.deleteUser);
// router.get('/courses', authenticateToken, isAdmin, getAllCourses);
// router.post('/courses', authenticateToken, isAdmin, AddCourse);

module.exports = router;