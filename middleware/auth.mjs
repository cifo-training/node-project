import HTTPError from 'http-errors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userDAO from '../models/user/dao.mjs';

const generateAccessToken = (user) => {
	return jwt.sign ({
			id: user._id
		}, process.env.SecretToken, {
			expiresIn: "24h"
		});
};

const localStrategy = 
	new LocalStrategy(async (username, password, done) => {
		const error = HTTPError (401, {message: 'Incorrect username or password.'});
		try {
			const user = await userDao.checkUser ({name:username});
			if (!user) {
				return done (error, false);
			}
			return done (null, user);
		} catch (error) {
			return done (error, false);
		}		
});

const bearerStrategy =
	new BearerStrategy(async (token, done) => {
	try {
		const payload = await jwt.verify (token, process.env.SecretToken);
		const user = await userDAO.listOne (payload.id);
		if (!user) {
			return done (null, false);
		}
		return done (null, user);
	} catch (error) {
		return done (error, false);
	}	
});

passport.use (localStrategy);
passport.use (bearerStrategy);

export const authLocal = passport.authenticate ('local', {session: false});
export const authJwt = passport.authenticate ('bearer', {session: false});
export {generateAccessToken};
