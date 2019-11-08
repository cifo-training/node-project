import basicAuth from 'basic-auth';
import HTTPError from 'http-errors';

const isAdmin = (request) => {
	request.sender = basicAuth(request);
	return (request.sender && 
					request.sender.name === process.env.AdminUser &&
					request.sender.pass === process.env.AdminPass);	
}

export const checkIfAdmin = (request, response, next) => {
	request.body.isAdmin = isAdmin (request);
	return next();
};

export const mustBeAdmin = (request, response, next) => {
	if (isAdmin (request)) {
		return next();
	} else {
		response.status(403).json ({message: "Not enough grants"});
	};
}
