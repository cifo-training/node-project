import Router from 'express';
import createCategory from '../controllers/categories/createCategory.js';
import findAllCategories from '../controllers/categories/findAllCategory.js';
import {verificaAdmin} from '../middleware/auth.js';


const router = Router();

router.get('/',findAllCategories);
router.post('/',verificaAdmin, createCategory);


export default router;