const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/signin', authController.signIn);
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.meAction);

module.exports = router;