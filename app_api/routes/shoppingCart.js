import Router from 'express';
import addProduct from '../controllers/shoppingCarts/addProduct.js';
import findCart from '../controllers/shoppingCarts/findCart.js';
import removeProduct from '../controllers/shoppingCarts/removeProduct.js';
import {verificaAdmin, verificaUser} from '../middleware/auth.js';

const router = Router();

router.get('/:id',verificaAdmin, findCart);
router.put('/:id', verificaUser,  addProduct);
router.delete('/:id', verificaUser, removeProduct);


export default router;