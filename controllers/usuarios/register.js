import userDao from '../../models/usuario/dao.js';
import HTTPError from 'http-errors';
import createToken from '../../services/index.js';

const register = async (req,res,next) => {

    try {

        const usuario = await userDao.register(Object.assign ({},req.body));
        
        if (!usuario) return next(HTTPError(404));
        
        const token = createToken(usuario);


        res.json({usuario:usuario, token:token})
      
        
    } catch (error) {

        next(error)
        
    }


}

export default register;