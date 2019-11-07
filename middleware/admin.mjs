import basicAuth from 'basic-auth';
import HTTPError from 'http-errors';

const isAdmin = (request) => {
	const request_sender = basicAuth(request);
	return (request_sender && 
					request_sender.name === process.env.AdminUser &&
					request_sender.pass === process.env.AdminPass);	
}

export const checkIfAdmin = (request, response, next) => {
	request.body.isAdmin = isAdmin (request);
	next();
};

export const mustBeAdmin = (request, response, next) => {
	if (isAdmin (request)) {
		return next();
	} else {
		response.status(403).send ({message: "Not enough grants"});
	};
}
