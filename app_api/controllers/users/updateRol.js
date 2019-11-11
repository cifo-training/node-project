import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const updateUserRol = async (req, res, next) =>{
    try {
        console.log(req.body.role);
        if (!req.body || !req.params.id || !req.body.role) {
            next(HTTPerror(400,{message:'Error en la entrada de parámetros'}));
        } else {
            const user = await userDao.updateRole(req.params.id,req.body.role);
            res.json(user);
        }
    } catch (error) {
        next(HTTPerror(error.code, {message:error.message}));
    }
}

export default updateUserRol;