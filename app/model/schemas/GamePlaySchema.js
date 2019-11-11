const Schema = require('mongoose').Schema;
const moment = require('moment-timezone');

// CREATE SCHEMA
const GamePlaySchema = Schema({
    userID: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    gameID: { 
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
        index: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    grade: {
        type: String,
        enum: ['S', 'A', 'B', 'C', 'D', 'E'],
        required: true
    },
    dateTime: {
        type: Date,
        default: moment.utc(),
        index: true
    }
});

// SCHEMA METHODS
GamePlaySchema.static('findLastMonth', function() {
    const dateLastMonth = moment().startOf('month');
    return this.find({ dateTime: {
        $gt: dateLastMonth
    }});

});

GamePlaySchema.static('findLastWeek', function() {
    const dateLastWeek = moment().startOf('week');
    return this.find({ dateTime: {
        $gt: dateLastWeek
    }});
});

GamePlaySchema.static('findToday', function() {
    const dateToday = moment().startOf('day');
    return this.find({ dateTime: {
        $gt: dateToday
    }});
});

GamePlaySchema.static('findByGame', function(gameId) {
    return this.find({ gameID: ObjectID(gameId)});
});

GamePlaySchema.static('findHighestScoreForGame', function(gameId) {
    return this.findByGame(gameId).findHighestScore().findOne();
});

GamePlaySchema.static('findByPlayer', function(playerId) {
    return this.find(playerId);
});

GamePlaySchema.static('findHighestScore', function() {
    return this.find().sort({score: -1}).limit(1);
});

GamePlaySchema.static('getUsersTotalScore', function() {
    return this.aggregate([
        {
            "$group": {
                "_id": "$userID",
                "score": {
                    "$sum": "$score"
                }
            }
        }
    ]);
});


module.exports = GamePlaySchema;