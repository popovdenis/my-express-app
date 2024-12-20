const express = require('express');
const { handleSignIn } = require('../controllers/signinController');
const router = express.Router();

router.post('/', handleSignIn);

module.exports = router;