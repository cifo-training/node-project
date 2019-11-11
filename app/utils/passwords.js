const bcrypt = require('bcrypt');

const config = require('../config/env-config.js');


async function encryptPassword(password) {
    return await bcrypt.hash(password, parseInt(config.BCRYPT_N_SALTS));
}

async function comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports= {encryptPassword, comparePasswords};