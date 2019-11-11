const jwt = require('jwt-simple');
const moment = require('moment-timezone');

const config = require('../config/env-config.js');

function decodeToken(token) {

    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            // Checks if token is expired. If true, reject promise
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Expired Token'
                });
            }
            // Resolve promise
            resolve(payload.sub);
        } catch (err) {
            // Token is not valid
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
 
    });
};

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };


    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = { createToken, decodeToken };