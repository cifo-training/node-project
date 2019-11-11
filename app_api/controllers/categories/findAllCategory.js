import categoryDao from '../../models/categories/categoryDao.js';
import HTTPerror from 'http-errors';

const findAllCategories = async(req, res,next) =>{
    try {
        const category = await categoryDao.list();
    
        res.json(category);
    } catch(err){
      next(HTTPerror(err.code, {message:err.message}));
    }

}

export default findAllCategories;