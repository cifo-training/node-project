const passport = require('passport');

const strategy = require('./strategy/jwt.js');

const options = { 
    failureRedirect: '/unauthorized',
    session: false 
};
// SET STRATEGIES
passport.use(strategy);

passport.initialize();

// EXPORT AUTHENTICATION FUNCTION
module.exports = {
    initialize: passport.initialize,
    authenticate: passport.authenticate('jwt', options)
};
