const GamePlaySchema = require('../schemas/index.js').GamePlaySchema;
const GamePlayModel = require('mongoose').model('GamePlay', GamePlaySchema);

module.exports = GamePlayModel;