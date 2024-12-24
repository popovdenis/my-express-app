const express = require('express');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { getCurrentUser, updateCurrentUser } = require('../controllers/customerController');

const router = express.Router();

router.get('/account', authenticateToken, getCurrentUser);
router.put('/account', authenticateToken, updateCurrentUser);

module.exports = router;