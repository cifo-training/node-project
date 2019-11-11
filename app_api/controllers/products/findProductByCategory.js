import productDao from '../../models/products/productDao.js';
import categoryDao from '../../models/categories/categoryDao.js';
import HTTPerror from 'http-errors';


const findProductByCategory = async(req, res,next) =>{
    try {
        console.log("entre por categoria");
        const category = await categoryDao.listOne(req.params.id);
        let products = await productDao.listProductsByCategory2();
        console.log("products: ",products);
        let productCategory= [];
        for(let i=0; i<products.length; i++){
            if(products[i].categoria.subcategoria.includes(category.categoria) || products[i].categoria.categoria == category.categoria){
                productCategory.push(products[i]);
            }
        }
        res.json(productCategory);
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }


}

export default findProductByCategory;