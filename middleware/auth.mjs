import HTTPError from 'http-errors';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import userDAO from '../models/user/dao.mjs';

export const generateAccessToken = (user) => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add ('30', 'minutes').unix()
	}
	
	return jwt.sign (payload, process.env.SecretToken);
};

const decodeToken = token => {
	const decoded = new Promise ((resolve, reject) => {
		try {
			const payload = jwt.verify (token, process.env.SecretToken);
			resolve (payload.sub);
		} catch (error) {
			if (error.name == "TokenExpiredError") {
				reject ({
					status: 401,
					message: "Token has expired"
				});
			} else {
				reject ({
					status: 500,
					message: "Invalid token"
				})
			}
		}
	});
	
	return decoded;
};

export const authLocal = async (request, response, next) => {
	try {
		if (request.sender && request.sender.name && request.sender.pass) {
			const user = await userDAO.checkUser({name:request.sender.name});
			if (user) {		
				if (await bcrypt.compare (request.sender.pass, user.password)) {
					return next();
				} else {
					response.status(400).json ({message : "Incorrect credentials"});
				}
			} else {
				response.status (400).json ({message: "User does not exist in DB"});
			}
		} else {
			response.status (400).json({message : "Credentials not supplied"});
		}
	} catch (error) {
		response.status(403).json ({message: "Cannot proceed"});
	}
};

export const isActive = async (request, response, next) => {
	try {
		if (request.user) {
			const user = await userDAO.listOne(request.user);
			if (user) {
				if (user.active) {
					return next();
				} else {
					response.status (403).json ({message: "Access locked"});
				}
			} else {
				response.status (403).json ({message: "Unknown user"});
			}
		} else {
			response.status(403).json ({message: "Unknown user"});
		}
	} catch (error) {
		response.status (403).json ({message: "Cannot proceed"});
	}
};

export const isAuthJwt = async (request, response, next) => {
	if (!request.headers.authorization) {
		response.status (403).json ({message: "Not authorized"});
	} else {
		const token = request.headers.authorization.split(' ')[1];
		decodeToken (token)
			.then (value => {
				request.user = value;
				next();
			})
			.catch (error => {
				response.status (error.status).json (error.message);
			});
	}
};
