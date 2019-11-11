import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';

const findUserPaginator = async(req, res,next) =>{
    try {
        if (!req.params.page || !req.params.numElem) {
            next(HTTPerror(400,{message:'Se necita el número de página y el número de elementos'}));
        } else {
            const user = await userDao.paginator(parseInt(req.params.page), parseInt(req.params.numElem));
            const user_number = await userDao.count();
            user.push({ user_number });
            res.json(user);
        }
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default findUserPaginator;