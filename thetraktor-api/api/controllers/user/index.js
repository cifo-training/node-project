import Router from 'express';

import login from './login.js';
import register from './register.js';
import {authLocal} from '../../middleware/auth.js';

const router = Router();


router.post('/login', authLocal,login);
router.post('/signup', register);
    
export default router;        