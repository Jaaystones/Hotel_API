const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Pass the error to the next middleware
    }

    const codeStatus = res.codeStatus ? res.codeStatus : 500;
    res.status(codeStatus).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

export default errorHandler;
