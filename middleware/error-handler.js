import HTTPErrors from 'http-errors';
import HTTPStatuses from 'statuses';

export default {

    logError(err,req,res,next) {
        req.error = err;
        console.log(err);
   next(err);
    },

    clientErrorHandler(err,req,res,next){
        
        if(err instanceof HTTPErrors.HttpError)
            res.status(err.statusCode).send (err.message);
        
        next(err);
        
    },

    errorHandler(err,req,res,next){
        if (res.headersSent) {
            return next(err);
          }

          res.status(500).send('se ha producido un error: ',err.type);
      }
}    

