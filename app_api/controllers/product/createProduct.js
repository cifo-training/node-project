import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';

const createProduct = async(req, res,next) =>{
    try {
        if (!req.body) {
            next(HTTPerror(400,{message:'Error en los parámetros de entrada'}));
        } else {
            const product = await productDao.create(req.body);
            res.send(product);
        }
    } catch (err) {
        if(err.name == 'ValidationError') {
            next(HTTPerror(400,{message: err.message}));
        } else if (err.name == 'MongoError' && err.code == 11000) {
            next(HTTPerror(400,{message:'Duplicate validation error'}));          
        } else {
            next(HTTPerror(err.code, {message:err.message}));
        }
    }
}

export default createProduct;