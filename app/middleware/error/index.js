
/* ERROR HANDLER */
function errorHandler(error, request, response, next) {
    if (error) {
        if (response.headersSent) {
            return next(error);
        }
        console.error(error.stack);
        response.status(500).json({ "error": error.message });
    }
}

module.exports = errorHandler;