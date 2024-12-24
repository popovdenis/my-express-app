const express = require('express');
const adminController = require('../controllers/adminController');
const authenticateToken = require('../../middlewares/authenticateToken');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/users', authenticateToken, isAdmin, adminController.getAllUsers);
// router.get('/courses', authenticateToken, isAdmin, getAllCourses);
// router.post('/courses', authenticateToken, isAdmin, AddCourse);

module.exports = router;