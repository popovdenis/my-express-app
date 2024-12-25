const express = require('express');
const authenticateCustomer = require('../middlewares/authenticateCustomer');
const { getCurrentUser, updateCurrentUser } = require('../controllers/customerController');

const router = express.Router();

router.get('/account', authenticateCustomer, getCurrentUser);
router.put('/account', authenticateCustomer, updateCurrentUser);

module.exports = router;