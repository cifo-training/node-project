import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';


const findAllUsers = async(req, res,next) =>{
    try {
        const user = await userDao.list();
        if (req.query['count'] == 'true') {
            const user_number = user.length;
            user.push({ user_number });
        }
        res.json(user);
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }

}

export default findAllUsers;