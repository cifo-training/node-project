import HTTPerror from 'http-errors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userDAO from '../models/user/dao.js';
//import config from '../config/config.js';

const generateAccessToken = (user) => {

    return jwt.sign({

        id: user._id,

    }, process.env.SECRET_TOKEN, {

        expiresIn: 2592000

    });
};

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (username, password, done) => {

    const error = HTTPerror(401, { message: 'Incorrect username or password.' });

    try {
        const user = await userDAO.checkUser({ email: username });

        if (!user) return done(error, false);


        if (!await bcrypt.compare(password, user.password))
            return done(error, false);

        return done(null, user)

    } catch (error) {

        return done(error, false);
    }
});

const bearerStrategy = new BearerStrategy(async (token, done) => {

    try {

        const payload = await jwt.verify(token, process.env.SECRET_TOKEN)

        const user = await userDAO.listOne(payload.id);

        if (!user) return done(null, false);

        return done(null, user);

    } catch (error) {

        return done(error, false);
    }
});


passport.use(localStrategy);
passport.use(bearerStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('bearer', { session: false });
export { generateAccessToken };