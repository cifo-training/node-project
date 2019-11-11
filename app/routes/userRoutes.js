const router = require('express').Router();
const controller = require('../controller/index.js').UserController;
const auth = require('../middleware/auth/index.js');

// USER ROUTES auth.authenticate
router.get('/', controller.getAll);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/id/:id', controller.getUserById);
router.delete('/id/:id', controller.deleteUser);
router.get('/id/:id/score', controller.getUserTotalScore);
router.get('/me', controller.getCurrent); // TODO

module.exports = router;