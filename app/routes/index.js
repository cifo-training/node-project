const express = require('express');

const auth = require('../middleware/auth/index.js');
const controller = require('../controller/index.js').HomeController;
const gameRouter = require('./gameRoutes.js');
const gamePlayRouter = require('./gamePlayRoutes.js');
const userRouter = require('./userRoutes.js');

const appRouter = express.Router();

appRouter.use('/gameplays', gamePlayRouter);
appRouter.use('/games', gameRouter);
appRouter.use('/users', userRouter);

appRouter.get('/unauthorized', controller.unauthorized)
appRouter.get('/', auth.authenticate, controller.index);

module.exports = appRouter;