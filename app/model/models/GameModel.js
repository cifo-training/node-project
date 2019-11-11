const GameSchema = require('../schemas/index.js').GameSchema;
const GameModel = require('mongoose').model('Game', GameSchema);

module.exports = GameModel;