const express = require('express');
const router = express.Router();

// Use the routes
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', require('./signout'));
router.use('/protected', require('./protected'));

module.exports = router;