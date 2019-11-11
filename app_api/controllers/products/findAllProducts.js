
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';

const findAllProduct = async(req, res,next) =>{
    try {
        const products = await productDao.listAddCategory();
        if (req.query['count'] == 'true') {
            const product_number = products.length;
            res.json({products,product_number});
        }
        res.json(products);
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }

}

export default findAllProduct;