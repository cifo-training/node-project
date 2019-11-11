
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';

const findPromoProduct = async (req, res, next) => {
    try {
        let product = await productDao.list();
        let productPromo = [];
        product.forEach(element=>{
            if(element.promocion){
                productPromo.push(element);
            }
        })
        res.send(productPromo);
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default findPromoProduct;