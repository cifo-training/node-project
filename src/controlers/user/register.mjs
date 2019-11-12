import userDAO from '../../models/user/userDao.mjs';
import service from '../../middleware/token.mjs'
import moment from 'moment';
import config from '../../../config.mjs'

const register = async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.password || !req.body.password2
            || req.body.password != req.body.password2) {
            console.log("Error validación de datos");
            res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos params` } });
        } else {
            const data = {
                name: req.body.name,
                password: req.body.password
            }
            const user = await userDAO.create(data);
            let token = await service.createToken(user);
            console.log("Usuario creado");
            res.status(200).send({ data: { expires_in: config.TIME_EXP, expires_at: moment().add(config.TIME_EXP, 's').unix(), token: token } });
        }
    } catch (err) {
        if (err.name == 'MongoError' && err.code == 11000) {
            console.log("duplicado", err.code);
            res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos DB` } });
        }
     }
}

export default register;