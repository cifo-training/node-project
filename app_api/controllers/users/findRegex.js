import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';


const findRegex = async(req, res,next) =>{
    try {
        let regex = new RegExp(req.params.busqueda, 'i');
        console.log("regex", regex);
        const user = await userDao.buscarUsuarios(regex);
        res.json(user);
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }

}

export default findRegex;