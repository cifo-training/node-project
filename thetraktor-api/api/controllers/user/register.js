import userDAO from '../../models/user/dao.js';

import HTTPerror from 'http-errors';

const register = async (req, res, next) => {
    try {
        if (!req.body.email) {
            
            next(HTTPerror(400,{message:'name is needed'}));

        } else {

            const user = await userDAO.create(Object.assign({},req.body));    

            res.send(user);
            
        }
    } catch (error) {
        next(error);
    }
}

export default register;