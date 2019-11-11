const passportJWT = require('passport-jwt');
const config = require('../../../config/env-config.js');
const userDAO = require('../../../model/index.js').userDAO;

const Strategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
    usernameField: 'username',
    passwordField: 'password'
};

const strategy = new Strategy(options, (jwtPayload, done) => {

    return userDAO.findById(jwtPayload.id)
        .then(user => done(null, user || false))
        .catch(error => done(error, false));
    
});
module.exports = strategy;