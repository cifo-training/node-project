import Router from 'express';

//import login from './login.mjs';
import register from './register.mjs';
import usersList from './list.mjs';
import {activateUser, deactivateUser} from './beauty.mjs';

import {authLocal} from '../../middleware/auth.mjs';
import {checkIfAdmin, mustBeAdmin} from '../../middleware/admin.mjs';

const router = Router();

//router.post('/login', authLocal, login);
router.use(checkIfAdmin);
router.post('/register', register);

router.use(mustBeAdmin);
router.get('/', usersList);
router.patch ('/up/:id', activateUser);
router.patch ('/down/:id', deactivateUser);

export default router;
