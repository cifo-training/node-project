
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';


const findDiscountProduct = async (req, res, next) => {
    try {
        let product = await productDao.list();
        let productDiscount = [];
        product.forEach(element=>{
            if(element.oferta){
                productDiscount.push(element);
            }
        })
        res.send(productDiscount);
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default findDiscountProduct;