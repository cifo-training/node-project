import express from 'express';

import ctrlFilm from './controllers/films/index.js';
import ctrlUser from './controllers/usuarios/index.js';
import ctrlVotos from './controllers/votos/index.js';

import errorHandler from './middleware/error-handler.js';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/film', ctrlFilm);
app.use('/usuario', ctrlUser);
app.use('/votos', ctrlVotos);



app.use(errorHandler.logError);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);



export default app;