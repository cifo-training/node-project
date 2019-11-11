const gamePlayDAO = require('../model/index.js').gamePlayDAO ;

class GamePlayController {

    async listAllGamePlays(request, response, next) {
        gamePlayDAO.listAll().then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async insertGamePlay(request, response, next) {
        const { userID, gameID, score, grade, dateTime } = request.body;
        const data = { userID, gameID, score, grade, dateTime };
        
        gamePlayDAO.create(data).then(data => {
            response.status(200).json({
                'result': "success",
                'inserted': data
            });
        }).catch(error => next(error));
    }

    async getGamePlayById(request, response, next) {
        const { id } = request.params;
        
        gamePlayDAO.findById(id).then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getGamePlaysFromToday(request, response, next) {
        gamePlayDAO.findToday().then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getGamePlaysFromLastWeek(request, response, next) {
        gamePlayDAO.findLastWeek().then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getGamePlaysFromLastMonth(request, response, next) {
        gamePlayDAO.findLastMonth().then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getGamePlaysByGame(request, response, next) {
        const { id } = request.body;
    
        gamePlayDAO.findByGame(id).then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getHighestScoreGamePlayForGame(request, response, next) {
        const { id } = request.params;
    
        gamePlayDAO.findHighestScoreForGame(id).then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
    }

    async getGamePlaysByPlayer(request, response, next) {
        const { id } = request.body;
     
        gamePlayDAO.findByPlayer(id).then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
       
    }

    async editGamePlay() {
        const { id } = request.params;
        const { dateTime, score } = request.body;
        // !!! Las claves foráneas por el momento serán inmutables
        const data = {};
        // En este caso solamente añadimos las propiedades definidas,
        // ya que son las únicas que nos interesa que se modifiquen
        if (typeof dateTime !== 'undefined') data.dateTime = dateTime;
        if (typeof score !== 'undefined') data.score = score;
        
        gamePlayDAO.update(id, data).then(data => {
            if (data) {
                response.status(200).json({
                    result: "success",
                    modified: data
                });
            } else {
                response.status(404).json({
                    'result': 'error',
                    'error': 'NOT_FOUND',
                    'message': "Edition failed. Gameplay not found."
                });
            }
        }).catch(error => next(error));
    
    }

    async deleteGamePlay(request, response, next) {

        const { id } = request.params;

        gamePlayDAO.remove(id).then(data => {
            if (data) {
                response.status(200).json({
                    'result': "success",
                    'deleted': data
                });
            } else {
                response.status(404).json({
                    'result': 'error',
                    'error': 'NOT_FOUND',
                    'message': "Deletion failed. Game play not found."
                });
            }
        }).catch(error => next(error));
    }
};

module.exports =  new GamePlayController(); 