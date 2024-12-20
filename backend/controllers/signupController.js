exports.handleSignUp = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    res.status(200).json({ message: `User ${username} registered successfully.` });
};