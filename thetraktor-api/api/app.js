import express from 'express';
import ctrlUser from './controllers/user/index.js';

import controllerCustomer from './controllers/customer/index.js';
import controllerPlan from './controllers/plan/index.js';
import controllerPack from './controllers/pack/index.js';
import controllerTodo from './controllers/todo/index.js';

import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import {authJwt} from './middleware/auth.js'
import errorHandler from './middleware/error-handler.js';

const app = express();
const PORT=process.env.PORT;
const __dirname='./';

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(function(req, res, next) { //tratar CORS error en Angular
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", "https://neollob.github.io/thetraktor-admin");
    res.header("Access-Control-Allow-Origin", "https://armandorodgo.github.io/thetraktor-admin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });

app.use('/user', ctrlUser);
app.use('/customers',controllerCustomer);
//app.use('/plan',controllerPlan);
app.use('/plans',controllerPlan);
app.use('/packs',controllerPack);
//app.use('/product',controllerPack);
app.use('/todos',controllerTodo);
app.get('/',(q,r) => r.send('hola'));

app.use(errorHandler.logError);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);

//app.post('/',(q,r)=>res.send('hola post'));
//app.listen(PORT,_=>console.log(`Server started and listening on ${PORT}. See on http://localhost:${PORT}/`));
export default app;