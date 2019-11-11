const gameDAO = require('../model/index.js').gameDAO;

class GameController {

    async listAllGames(request, response, next) {

        gameDAO.listAll()
        .then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));   
    }

    async insertGame(request, response, next) {
        const { name, description, script, category } = request.body;
        const data = { name, description, script, category };
        gameDAO.create(data).then(data => {
            if (data) {
                response.status(200).json({
                    result: "success",
                    inserted: data
                });
            } else {
                response.status(400).json({
                    result: "error",
                    error: 'WRONG_ARGS',
                    message: "Game insertion failure. Perhaps request body data is wrong. Required fields: name, script[, category, description]"
                });
            }
        }).catch(error => next(error));
    }

    async listGamesInCategory(request, response, next) {
        const { category } = request.params;

        gameDAO.findByCategory(category).then(data => {
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(404).json({
                    result: "error",
                    error: 'NOT_FOUND',
                    message: "Category doesn't exist or it hasn't any games."
                });
            }
        }).catch(error => next(error));
    }

    async getGameById(request, response, next) {
        const { id } = request.params;

        gameDAO.findById(id).then(data => {
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(404).json({
                    result: "error",
                    error: 'NOT_FOUND',
                    message: "Game not found."
                });
            }
        }).catch(error => next(error));
    }

    async getGameByName(request, response, next) {
        const { name } = request.params;
        // NOTA: Obtiene uno solamente. El nombre ha de ser exacto (case insensitive)
        gameDAO.findByName(name).then(data => {
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(404).json({
                    result: "error",
                    error: 'NOT_FOUND',
                    message: "Game not found."
                });
            }
        });
    }


    async editGame(request, response, next) {
        const { id } = request.params;
        const { name, description, script, category } = request.body;

        const data = {};
        // En este caso solamente añadimos las propiedades definidas,
        // ya que son las únicas que nos interesa que se modifiquen
        if (typeof name !== 'undefined') data.name = name;
        if (typeof description !== 'undefined') data.description = description;
        if (typeof script !== 'undefined') data.script = script;
        if (typeof category !== 'undefined') data.category = category;
        
        gameDAO.update(id, data).then(data => {
            response.status(200).json({
                result: "success",
                modified: data
            });

        }).catch(error => next(error));
    }

    async deleteGame(request, response, next) {

        const { id } = request.params;

        gameDAO.remove(id).then(data => {
            if (data) {
                response.status(200).json({
                    result: "success",
                    deleted: data
                });
            } else {
                response.status(404).json({
                    result: "error",
                    error: 'NOT_FOUND',
                    message: "Game not found."
                });
            }
        }).catch(error => next(error));
    }

};

module.exports = new GameController();