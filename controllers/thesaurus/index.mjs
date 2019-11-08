import Router from 'express';

import thesaurusList from './list.mjs';
import thesaurusShow from './show.mjs';
import thesaurusCreate from './create.mjs';
import thesaurusUpdate from './update.mjs';
import thesaurusRemove from './remove.mjs';

const router = Router();

router.route('/')
	.get(thesaurusList)
	.post(thesaurusCreate);

router.route('/:id')
	.get(thesaurusShow)
	.put(thesaurusUpdate)
	.delete(thesaurusRemove);

export default router;
