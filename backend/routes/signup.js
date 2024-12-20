const express = require('express');
const { handleSignUp } = require('../controllers/signupController');
const router = express.Router();

router.post('/', handleSignUp);

module.exports = router;