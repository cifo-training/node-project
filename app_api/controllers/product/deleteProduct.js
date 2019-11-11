
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';


const deleteProduct = async (req, res, next) => {
    try {
        const product = await productDao.remove(req.params.id);
        res.send(product);
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default deleteProduct;