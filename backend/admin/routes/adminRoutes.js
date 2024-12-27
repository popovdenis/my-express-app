const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');

const AdminAuthController = require('../controllers/AdminAuthController');
const CustomerController = require('../controllers/CustomerController');
const AdminUserController = require('../controllers/AdminUserController');
const CourseController = require('../controllers/CourseController');
const AttributeController = require('../controllers/AttributeController');
const EntityTypeController = require('../controllers/EntityTypeController');
const EnrollmentController = require('../controllers/EnrollmentController');
const uploadRoutes = require("../../routes/uploadRoutes");

const router = express.Router();
// authentication
router.post('/signin', AdminAuthController.adminSignIn);
router.post('/logout', AdminAuthController.adminLogout);
router.get('/me', authenticateAdminToken, AdminAuthController.checkAdminAction);

// customers
router.get('/customers', authenticateAdminToken, isAdmin, CustomerController.getList);
router.get('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.getEntity);
router.post('/customers', authenticateAdminToken, isAdmin, CustomerController.addEntity);
router.put('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.updateEntity);
router.delete('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.deleteEntity);

// courses
router.get('/courses', authenticateAdminToken, isAdmin, CourseController.getList);
router.get('/courses/:id', authenticateAdminToken, isAdmin, CourseController.getEntity);
router.post('/courses', authenticateAdminToken, isAdmin, CourseController.addEntity);
router.put('/courses/:id', authenticateAdminToken, isAdmin, CourseController.updateEntity);
router.delete('/courses/:id', authenticateAdminToken, isAdmin, CourseController.deleteEntity);

// entity
router.get('/attribute_entity', authenticateAdminToken, isAdmin, EntityTypeController.getList);

// users
router.get('/users', authenticateAdminToken, isAdmin, AdminUserController.getList);
router.get('/users/:id', authenticateAdminToken, isAdmin, AdminUserController.getEntity);
router.post('/users', authenticateAdminToken, isAdmin, AdminUserController.addEntity);
router.put('/users/:id', authenticateAdminToken, isAdmin, AdminUserController.updateEntity);
router.delete('/users/:id', authenticateAdminToken, isAdmin, AdminUserController.deleteEntity);

// attributes
router.get('/attributes', authenticateAdminToken, isAdmin, AttributeController.getList);
router.get('/attributes/code/:attributeCode', authenticateAdminToken, isAdmin, AttributeController.getAttributeByCode);
router.get('/attributes/:id', authenticateAdminToken, isAdmin, AttributeController.getEntity);
router.post('/attributes', authenticateAdminToken, isAdmin, AttributeController.addEntity);
router.put('/attributes/:id', authenticateAdminToken, isAdmin, AttributeController.updateEntity);
router.delete('/attributes/:id', authenticateAdminToken, isAdmin, AttributeController.deleteEntity);

// attributes by entity
router.get('/attribute_entity/:entityTypeCode', authenticateAdminToken, isAdmin, AttributeController.getAttributesByEntityType);

// uploads
router.use('/uploads', uploadRoutes);

// course enrollments
router.get('/enrollments', authenticateAdminToken, isAdmin, EnrollmentController.getList);

module.exports = router;

module.exports = router;