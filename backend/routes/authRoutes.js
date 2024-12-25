const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signin', authController.signIn);
router.post('/admin/signin', authController.adminSignIn);
router.get('/admin/me', authController.checkAdminAction);
router.post('/signup', authController.signUp);
router.post('/logout', authController.logout);

module.exports = router;