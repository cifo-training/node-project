import Router from 'express';
import findPaginator from '../controllers/products/findPaginator.js';
import findAllProducts from '../controllers/products/findAllProducts.js';
import findProductByCategory from '../controllers/products/findProductByCategory.js';


const router = Router();

router.get('/', findAllProducts);
router.get('/:page/:elements', findPaginator);
router.get('/buscar/categories/:id', findProductByCategory)

export default router;