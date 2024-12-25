const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');
const userController = require('../controllers/userController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.post('/signin', authController.adminSignIn);
router.get('/me', authenticateAdminToken, authController.checkAdminAction);
router.get('/users', authenticateAdminToken, isAdmin, userController.getAllUsers);
router.post('/users', authenticateAdminToken, isAdmin, userController.addUser);
router.get('/users/:id', authenticateAdminToken, isAdmin, userController.getUser);
router.put('/users/:id', authenticateAdminToken, isAdmin, userController.updateUser);
router.delete('/users/:id', authenticateAdminToken, isAdmin, userController.deleteUser);
// router.get('/settings', authenticateAdminToken, isAdmin, adminController);
// router.get('/courses', authenticateToken, isAdmin, getAllCourses);
// router.post('/courses', authenticateToken, isAdmin, AddCourse);

module.exports = router;