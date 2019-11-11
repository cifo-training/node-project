import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const register = async(req, res,next) =>{

    try {
        if (!req.body) {
            next(HTTPerror(400,{message:'Error en los parámetros de entrada'}));
        } else {

            const user = await userDao.create(req.body);
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

export default register;