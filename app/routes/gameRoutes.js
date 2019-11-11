const router = require('express').Router();
const controller = require('../controller/index.js').GameController;

// raíz
router.get('/', controller.listAllGames);
router.post('/', controller.insertGame);
// Búsqueda
router.get('/id/:id', controller.getGameById);
router.get('/name/:name', controller.getGameByName);
router.get('/category/:category', controller.listGamesInCategory);
// Modificar/borrar
router.put('/:id', controller.editGame);
router.delete('/:id', controller.deleteGame);

module.exports = router;