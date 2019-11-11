const router = require('express').Router();
const controller = require ('../controller/index.js').GamePlayController;

router.get('/', controller.listAllGamePlays);
router.post('/', controller.insertGamePlay);
// Búsqueda
router.get('/id/:id', controller.getGamePlayById);
router.get('/today', controller.getGamePlaysFromToday);
router.get('/week', controller.getGamePlaysFromLastWeek);
router.get('/month', controller.getGamePlaysFromLastMonth);
router.get('/game/:id', controller.getGamePlaysByGame);
router.get('/game/:id/highest', controller.getHighestScoreGamePlayForGame);
router.get('/player/:id', controller.getGamePlaysByPlayer);
// Modificar/borrar
router.put('/:id', controller.editGamePlay);
router.delete('/:id', controller.deleteGamePlay);

module.exports = router;