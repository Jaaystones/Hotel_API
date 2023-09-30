const errorHandler = (err, req, res, next) => {

    const codeStatus = res.codeStatus ? res.
    codeStatus: 500
    return res.status(codeStatus).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? 
        err.stack : stack,
    });
};

export default errorHandler;