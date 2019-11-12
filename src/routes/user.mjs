
import MongoManager from '../../MongoManager.mjs';
import config from '../../config.mjs';
import Router from 'express';
import login from '../controlers/user/login.mjs';
import register from '../controlers/user/register.mjs';

const mongo = new MongoManager(config);
const router = Router()
mongo.connect();

router 
  .post('/register', register)
  .post('/login', login)

  
export default router;
