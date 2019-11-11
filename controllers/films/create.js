import Router from 'express';

import create from './create.js';
import list from './list.js';
import listOne from './listOne.js';
import update from './update.js';
import remove from './remove.js'

const router = Router();

router.route ('/')
      .post(create)
      .get(list);

router.route('/:id')
      .get(listOne)
      .put(update)
      .delete(remove);
      
export default router;