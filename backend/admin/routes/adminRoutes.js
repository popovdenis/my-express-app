const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');

const adminAuthController = require('../controllers/authController');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/signin', adminAuthController.adminSignIn);
router.post('/logout', adminAuthController.adminLogout);
router.get('/me', authenticateAdminToken, adminAuthController.checkAdminAction);

router.get('/users', authenticateAdminToken, isAdmin, userController.getAllUsers);
router.post('/users', authenticateAdminToken, isAdmin, userController.addUser);
router.get('/users/:id', authenticateAdminToken, isAdmin, userController.getUser);
router.put('/users/:id', authenticateAdminToken, isAdmin, userController.updateUser);
router.delete('/users/:id', authenticateAdminToken, isAdmin, userController.deleteUser);

router.get('/courses', authenticateAdminToken, isAdmin, courseController.getAllCourses);
router.post('/courses', authenticateAdminToken, isAdmin, courseController.addCourse);
router.get('/courses/:id', authenticateAdminToken, isAdmin, courseController.getCourse);
router.put('/courses/:id', authenticateAdminToken, isAdmin, courseController.updateCourse);
router.delete('/courses/:id', authenticateAdminToken, isAdmin, courseController.deleteCourse);

// router.get('/settings', authenticateAdminToken, isAdmin, adminController);

module.exports = router;