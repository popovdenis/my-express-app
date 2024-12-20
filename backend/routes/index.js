const express = require('express');
const router = express.Router();

// Import individual routes
const registerRoute = require('./signup');
const signInRoute = require('./signin');

// Use the routes
router.use('/signup', registerRoute);
router.use('/signin', signInRoute);

module.exports = router;