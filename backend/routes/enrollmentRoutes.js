const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const authenticateCustomer = require('../middlewares/authenticateCustomer');

const router = express.Router();

router.get('/', enrollmentController.getList);
router.post('/:courseId/enroll', authenticateCustomer, enrollmentController.enrollInCourse);
router.put('/:enrollmentId/status', authenticateCustomer, enrollmentController.updateEnrollmentStatus);
router.get('/customer', authenticateCustomer, enrollmentController.getCustomerEnrollmentStatus);

module.exports = router;