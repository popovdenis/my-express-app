const express = require('express');
const authRoutes = require('./authRoutes');
const customerRoutes = require('./customerRoutes');
const adminRoutes = require('../admin/routes/adminRoutes');
const courseRoutes = require('./courseRoutes');
const uploadRoutes = require("../routes/uploadRoutes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);
router.use('/admin', adminRoutes);
router.use('/courses', courseRoutes);

module.exports = router;