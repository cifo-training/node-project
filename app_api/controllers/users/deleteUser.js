import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const deleteUser = async(req, res, next) =>{
    try{
        if (!req.params.id) {
            next(HTTPerror(400,{message:'Se necesita el parametro id'}));
        } else {    
            const user = await userDao.remove(req.params.id);
            res.json(user);
        }
} catch (err){
    
    next(HTTPerror(err.code, {message:err.message}));
}
}

export default deleteUser;