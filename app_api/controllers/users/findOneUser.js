import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const findOneUser = async(req, res,next) =>{
    try {
        if (!req.params.id) {
            next(HTTPerror(400,{message:'Se necesita el parametro id'}));
        } else {
            const user = await userDao.listOne(req.params.id);
            res.json(user);
        }
    } catch (error) {

        next(HTTPerror(error.code, {message:error.message}));
    }
}

export default findOneUser;