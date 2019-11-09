import HTTPErrors from 'http-errors';

export default {

	logError(error, request, response, next){
		request.error = error;
		console.error (error);
		return next (error);
	},
	
	clientErrorHandler(error, request, response, next){
		if (error instanceof HTTPErrors.HTTPError){
			response.status (error.statusCode).send (error.message);
		}
		return next (error);
	},

	errorHandler(error, request, response, next){
		if (response.headersSent){
			return next (error);
		}
		response.status (500).json ({"error": error.type});
	},
	
	noMore(request, response) {
		response.end();
	},
	
	unRoute (request, response) {
		response.status(404).json ({message: "Unknown route"});
	},
};
