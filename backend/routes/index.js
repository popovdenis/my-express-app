const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

router.use('/auth', require('./authRoutes'));
router.use('/my-account', authenticateToken, require('./myAccount'));

module.exports = router;