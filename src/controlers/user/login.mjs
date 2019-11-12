
import service from '../../middleware/token.mjs';
import bcrypt from 'bcrypt'
import userDao from '../../models/user/userDao.mjs'
import moment from 'moment';
import config from '../../../config.mjs'

const login = async (req, res) => {
    try {
        if (!req.body.name || !req.body.password) {
            res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos` } });
            console.log("Error validación de datos");
        }
        else {
            const user = await userDao.userByName(req.body.name);
            const result = await bcrypt.compare(req.body.password, user[0].password)
            if (result) {
                console.log("Vienvenido usuario");
                res.status(200).send({ data: { expires_in: config.TIME_EXP, expires_at: moment().add(config.TIME_EXP, 's').unix(), token: await service.createToken(user[0]) } });
            } else {
                console.log("Error validación de datos password");
                res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos password/name` } });
            }
        }
    } catch (err) {
        console.log("Error validación de datos name");
        res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos name/password` } });
    }
}

export default login;
