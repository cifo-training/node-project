
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';

const findAllProduct = async(req, res,next) =>{
    try {
        const products = await productDao.paginator(req.params.page, req.params.elements);
        res.json(products);
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }

}


export default findAllProduct;