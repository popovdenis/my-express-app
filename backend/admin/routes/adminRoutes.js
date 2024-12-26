const express = require('express');
const authenticateAdminToken = require('../../middlewares/authenticateAdmin');
const isAdmin = require('../middlewares/isAdmin');

const adminAuthController = require('../controllers/authController');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');
const attributeController = require('../controllers/attributeController');
const entityTypeController = require('../controllers/entityTypeController');

const router = express.Router();
// authentication
router.post('/signin', adminAuthController.adminSignIn);
router.post('/logout', adminAuthController.adminLogout);
router.get('/me', authenticateAdminToken, adminAuthController.checkAdminAction);
// users
router.get('/users', authenticateAdminToken, isAdmin, userController.getList);
router.post('/users', authenticateAdminToken, isAdmin, userController.addEntity);
router.get('/users/:id', authenticateAdminToken, isAdmin, userController.getEntity);
router.put('/users/:id', authenticateAdminToken, isAdmin, userController.updateEntity);
router.delete('/users/:id', authenticateAdminToken, isAdmin, userController.deleteEntity);
// courses
router.get('/courses', authenticateAdminToken, isAdmin, courseController.getList);
router.post('/courses', authenticateAdminToken, isAdmin, courseController.addEntity);
router.get('/courses/:id', authenticateAdminToken, isAdmin, courseController.getEntity);
router.put('/courses/:id', authenticateAdminToken, isAdmin, courseController.updateEntity);
router.delete('/courses/:id', authenticateAdminToken, isAdmin, courseController.deleteEntity);
// attributes
router.get('/attribute_entity', authenticateAdminToken, isAdmin, entityTypeController.getList);
router.get('/attributes', authenticateAdminToken, isAdmin, attributeController.getList);
router.post('/attributes', authenticateAdminToken, isAdmin, attributeController.addEntity);
router.get('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.getEntity);
router.get('/attributes/code/:attributeCode', authenticateAdminToken, isAdmin, attributeController.getAttributeByCode);
router.put('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.updateEntity);
router.delete('/attributes/:id', authenticateAdminToken, isAdmin, attributeController.deleteEntity);

module.exports = router;