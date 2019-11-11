import Router from 'express';
import findAllUsers from '../controllers/users/findAllUsers.js';
import findOneUser from '../controllers/users/findOneUser.js';
import updateUser from '../controllers/users/updateUser.js';
import deleteUser from '../controllers/users/deleteUser.js';
import updateRol from '../controllers/users/updateRol.js';
import findUserPaginator from '../controllers/users/findUserPaginator.js';
import findRegex from '../controllers/users/findRegex.js';
import {verificaAdmin, verificaUser, verificaTokens} from '../middleware/auth.js';


const router = Router();

router.get('/',verificaAdmin, findAllUsers);

router.get('/:id', verificaUser, findOneUser);

router.get('/:page/:numElem', verificaAdmin, findUserPaginator );

router.get('/buscar/regex/:busqueda', verificaAdmin, findRegex);

router.put('/:id', verificaUser, updateUser);

router.put('/role/:id', verificaAdmin, updateRol);

router.delete('/:id', verificaUser, deleteUser);

export default router;