const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    res.status(200).json({ message: `Sign In of ${email} is successful` });
});

module.exports = router;