import jwt from 'jsonwebtoken';
import userDAO from '../models/users/userDao.js';



const verificaTokens = async (req, res, next) => {
    try {
        let token = req.body.token;
        if(token == undefined){
            token= req.query.token;
        }
        const payload = await jwt.verify(token, process.env.TOKEN);
        const user = await userDAO.findByEmail(payload.email);
        if (!user) {
            return res.status(401).json({
                mensaje: 'Token incorrecto',
                errors: 'Token no válido'
            });
        }
        else {
            next();
        }
    } catch (err) {
        return res.status(401).json({
            mensaje: 'Token incorrecto',
            errors: err
        });
    }
}

const verificaAdmin = async (req, res, next) => {
    try {
        let token = req.body.token;
        if(token == undefined){
            token= req.query.token;
        }
        
        const payload = await jwt.verify(token, process.env.TOKEN);
        const user = await userDAO.findByEmail(payload.email);
        if (!user) {
            return res.status(401).json({
                mensaje: 'Token incorrecto',
                errors: 'Token no válido'
            });
        } else if(user[0].role != 'ADMIN_ROLE'){
            return res.status(401).json({
                mensaje: 'Token incorrecto',
                errors: 'El rol no es administrador'
            });
        }
        else {
            next();
        }
    } catch (err) {
        return res.status(401).json({
            mensaje: 'Token incorrecto',
            errors: err
        });
    }
}

const verificaUser = async (req, res, next) => {
    try {
        let token = req.body.token;
        if(token == undefined){
            token= req.query.token;
        }
        const payload = await jwt.verify(token, process.env.TOKEN);
        const user = await userDAO.findByEmail(payload.email);
        console.log(user[0].role);
        if (!user) {
            return res.status(401).json({
                mensaje: 'Token incorrecto',
                errors: 'Token no válido'
            });
        } else if(user[0].role != 'ADMIN_ROLE' && (user[0]._id != req.params.id)){
            return res.status(401).json({
                mensaje: 'Token incorrecto',
                errors: 'El Token no tiene autorizacion'
            });
        }
        else {
            next();
        }
    } catch (err) {
        return res.status(401).json({
            mensaje: 'Token incorrecto',
            errors: err
        });
    }
}
 


export { verificaTokens, verificaAdmin, verificaUser };

