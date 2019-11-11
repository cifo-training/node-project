
import productDao from '../../models/products/productDao.js';
import HTTPerror from 'http-errors';
import {Product} from '../../models/model.js';

const updateProduct = async (req, res, next) => {
    try {

        if(!req.body.precioUnitario || !req.body.nombre && !req.body.cantidad && !req.body.categoria){
            next(HTTPerror(400, {message:"faltan parametros de entrada"}));
        }
        // // let product = new Product();
        // // Object.assign(product, req.body);
        // let data = req.body;
        // data._id = req.params.id;
        

        // let product = await productDao.create(data);
        // // let product = await productDao.update(req.params.id,req.body);

        let product = await productDao.listOne(req.params.id);
        product = await productDao.update2(product, req.body);


        res.send(product);
    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default updateProduct;