const express = require('express');
const authRoutes = require('./authRoutes');
const customerRoutes = require('./customerRoutes');
const adminRoutes = require('../admin/routes/adminRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);
router.use('/admin', adminRoutes);

module.exports = router;