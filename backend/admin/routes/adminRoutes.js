const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');

const adminAuthController = require('../controllers/authController');
const CustomerController = require('../controllers/CustomerController');
const AdminUserController = require('../controllers/AdminUserController');
const courseController = require('../controllers/courseController');
const AttributeController = require('../controllers/AttributeController');
const entityTypeController = require('../controllers/entityTypeController');

const router = express.Router();
// authentication
router.post('/signin', adminAuthController.adminSignIn);
router.post('/logout', adminAuthController.adminLogout);
router.get('/me', authenticateAdminToken, adminAuthController.checkAdminAction);
// customers
router.get('/customers', authenticateAdminToken, isAdmin, CustomerController.getList);
router.get('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.getEntity);
router.post('/customers', authenticateAdminToken, isAdmin, CustomerController.addEntity);
router.put('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.updateEntity);
router.delete('/customers/:id', authenticateAdminToken, isAdmin, CustomerController.deleteEntity);
// courses
router.get('/courses', authenticateAdminToken, isAdmin, courseController.getList);
router.get('/courses/:id', authenticateAdminToken, isAdmin, courseController.getEntity);
router.post('/courses', authenticateAdminToken, isAdmin, courseController.addEntity);
router.put('/courses/:id', authenticateAdminToken, isAdmin, courseController.updateEntity);
router.delete('/courses/:id', authenticateAdminToken, isAdmin, courseController.deleteEntity);
// entity
router.get('/attribute_entity', authenticateAdminToken, isAdmin, entityTypeController.getList);
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

module.exports = router;