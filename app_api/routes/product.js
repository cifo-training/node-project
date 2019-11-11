import Router from 'express';
import findOneProduct from '../controllers/product/findOneProduct.js';
import updateProduct from '../controllers/product/updateProduct.js';
import deleteProduct from '../controllers/product/deleteProduct.js';
import createProduct from '../controllers/product/createProduct.js';
import findDiscountProduct from '../controllers/product/findDiscountProduct.js';
import findPromoProduct from '../controllers/product/findPromoProduct.js';
import {verificaAdmin} from '../middleware/auth.js';

const router = Router();

router.post('/', verificaAdmin, createProduct);

router.get('/:id', findOneProduct);

router.put('/:id', verificaAdmin, updateProduct);

router.delete('/:id', verificaAdmin, deleteProduct);

router.get('/buscar/oferta',findDiscountProduct);

router.get('/buscar/promocion',findPromoProduct);

export default router;