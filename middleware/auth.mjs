import HTTPError from 'http-errors';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userDAO from '../models/user/dao.mjs';

export const generateAccessToken = (user) => {
	return jwt.sign ({
			id: user._id
		}, process.env.SecretToken, {
			expiresIn: "24h"
		});
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
