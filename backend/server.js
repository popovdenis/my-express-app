require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middlewares/authenticateToken');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(errorHandler);
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.id} ` })
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});