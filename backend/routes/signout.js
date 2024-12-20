const express = require('express');
const { handleSignOut } = require('../controllers/signoutController');
const router = express.Router();

router.post('/', handleSignOut);

module.exports = router;