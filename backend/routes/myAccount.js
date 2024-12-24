const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/myAccountController');
const { authenticateToken } = require('../middlewares/authenticateToken');

router.put('/', authenticateToken, updateUserProfile);

module.exports = router;