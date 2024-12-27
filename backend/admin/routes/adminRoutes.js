const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');

const adminAuthController = require('../controllers/authController');
const CustomerController = require('../controllers/CustomerController');
const courseController = require('../controllers/courseController');
const attributeController = require('../controllers/attributeController');
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

// attributes
router.get('/attributes', authenticateAdminToken, isAdmin, attributeController.getList);
router.get('/attributes/code/:attributeCode', authenticateAdminToken, isAdmin, attributeController.getAttributeByCode);
router.get('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.getEntity);
router.post('/attributes', authenticateAdminToken, isAdmin, attributeController.addEntity);
router.put('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.updateEntity);
router.delete('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.deleteEntity);

// attributes by entity
router.get('/attribute_entity/:entityTypeCode', authenticateAdminToken, isAdmin, attributeController.getAttributesByEntityType);

module.exports = router;