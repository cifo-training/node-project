import Router from 'express';

import login from './login.mjs';
import register from './register.mjs';
import {updateAsAdmin} from './update.mjs';
import usersList from './list.mjs';
import {activateUser, deactivateUser} from './beauty.mjs';
import {removeUser} from './remove.mjs'

import {authLocal} from '../../middleware/auth.mjs';
import {checkIfAdmin, mustBeAdmin} from '../../middleware/admin.mjs';

const router = Router();

router.use(checkIfAdmin);

router.post('/login', authLocal, login);
router.post('/register', register);
router.put('/:id', updateAsAdmin);

router.use(mustBeAdmin);
router.get('/', usersList);
router.patch('/up/:id', activateUser);
router.patch('/down/:id', deactivateUser);
router.delete('/:id', removeUser);

export default router;
