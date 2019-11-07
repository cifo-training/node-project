import express from 'express';

//import {authJwt} from './middleware/auth.mjs'

import ctrlUser from './controllers/user/index.mjs';
//import ctrlStudent from './controllers/student/index.mjs';

import errorHandler from './middleware/error-handler.mjs';

const app = express();

app.use (express.urlencoded ({extended:true}));
app.use (express.json());

app.use('/user', ctrlUser);
//app.use('/student',authJwt,ctrlStudent);

app.use (errorHandler.logError);
app.use (errorHandler.clientErrorHandler);
app.use (errorHandler.errorHandler);

export default app;
