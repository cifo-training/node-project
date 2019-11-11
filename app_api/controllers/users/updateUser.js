import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const updateUser = async (req, res, next) =>{
    try {       
        if (!req.body || !req.params.id) {
            next(HTTPerror(400,{message:'Error en la entrada de parámetros'}));
        } else {
            const user = await userDao.update(req.params.id,req.body);
            res.json(user);
        }
    } catch (err) {
        if(err.name == 'ValidationError') {
            next(HTTPerror(400,{message: err.message}));
        } else if (err.name == 'MongoError' && err.code == 11000) {
            console.log(err);
            next(HTTPerror(400,{message:'Email duplicado'}));          
        } else {
            next(HTTPerror(err.code, {message:err.message}));
        }
    }
}

export default updateUser;