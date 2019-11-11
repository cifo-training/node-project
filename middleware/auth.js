import userDao from '../models/usuario/dao.js';
import createToken from '../services/index.js';
import HTTPError from 'http-errors';

import dotenv from 'dotenv';

dotenv.config();


const auth = async data => {

try {
    const usuario  = await userDao.login({},{email:data.email,password:data.password});

    if(!usuario) return HTTPError(404, 'usuario incorrecto');

    const token = createToken(usuario);

    return token;

} catch (error) {
    console.log(error)
    res.status(401).send({error:'Por favor autentica tu usuario!'})
}
}

export default auth;