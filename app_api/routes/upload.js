import Router from 'express';
import upload from '../controllers/upload/upload.js';
import enviarFile from '../controllers/upload/enviarFile.js';
import {verificaUser} from '../middleware/auth.js';

const router = Router();

router.put('/:id', verificaUser, upload);
router.get('/:id', verificaUser, enviarFile);


export default router;