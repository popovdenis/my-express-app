const express = require('express');
const router = express.Router();

// Use the routes
router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', require('./signout'));
router.use('/my-account', require('./myAccount'));

module.exports = router;