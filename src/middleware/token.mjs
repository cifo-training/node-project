import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../../config.mjs'

const createToken = async (user) => {
    const payLoad = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(config.TIME_EXP, 's').unix()
    }
    return await jwt.sign(payLoad, config.SECRET_TOKEN);
}

const decodeToken = (token) => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub); 
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    })
    return decoded;
}

export default  {createToken, decodeToken};