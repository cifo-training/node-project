import Router from 'express';

import thesaurusList from './list.mjs';
import thesaurusShow from './show.mjs';
import thesaurusCreate from './create.mjs';
import thesaurusUpdate from './update.mjs';
import thesaurusRemove from './remove.mjs';

import isValidId from '../../middleware/id.mjs';

const router = Router();

router.route('/')
	.get(thesaurusList)
	.post(thesaurusCreate);

router.route('/:id')
	.get(isValidId, thesaurusShow)
	.put(isValidId, thesaurusUpdate)
	.delete(isValidId, thesaurusRemove);

export default router;
