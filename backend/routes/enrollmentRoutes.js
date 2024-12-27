const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

router.get('/', enrollmentController.getList);

module.exports = router;