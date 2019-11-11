
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';


const findOneProduct = async (req, res, next) => {
    try {
        const product = await productDao.listOne(req.params.id);
        res.send(product);
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default findOneProduct;