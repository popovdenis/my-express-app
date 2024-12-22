const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;