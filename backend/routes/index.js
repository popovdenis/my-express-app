const express = require('express');
const authRoutes = require('./authRoutes');
const customerRoutes = require('./customerRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);

module.exports = router;