import HTTPErrors from 'http-errors';

export default {
    logError(err, req, res, next) {
        console.log(err.message);
        next(err);
    },
    clientErrorHandler(err, req, res, next) {
        if (err instanceof HTTPErrors.HttpError) {
            res.status(err.statusCode)
                .send(err.message);
        }
        next(err);
    },
    errorHandler(err, req, res, next) {
        if(res.headerSent){
            return next(err);
        }
        res.status(500)
        .send('se ha producido un error',error.type);
    }
}