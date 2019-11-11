import express from 'express';

import {isAuthJwt, isActive} from './middleware/auth.mjs'

import ctrlUser from './controllers/user/index.mjs';
import ctrlThesaurus from './controllers/thesaurus/index.mjs';

import errorHandler from './middleware/error-handler.mjs';

const app = express();

app.use (express.urlencoded ({extended:true}));
app.use (express.json());

app.use('/user', ctrlUser, errorHandler.noMore);
app.use('/thesaurus', isAuthJwt, isActive, ctrlThesaurus, errorHandler.noMore);

app.use (errorHandler.logError);
app.use (errorHandler.clientErrorHandler);
app.use (errorHandler.errorHandler);

app.use ('*', errorHandler.unRoute);

export default app;
