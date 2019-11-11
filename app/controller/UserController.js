const createToken = require('../utils/tokens.js').createToken;
const comparePasswords = require('../utils/passwords.js').comparePasswords;
const userDAO = require('../model/index.js').userDAO;
const gamePlayDAO = require('../model/index.js').gamePlayDAO;

class UserController {

    async login(request, response, next) {

        const { username, password } = request.body;

        if (username && password) {

            userDAO.findByUsername(username)
                .then(user => {
                    if (user && comparePasswords(password, user.password)) {
                        const token = createToken(user);
                        response.status(200).json({
                            "result": "success",
                            "message": "Logged in",
                            token 
                        });
                    } else {
                        response.sendStatus(401).json({
                            "result": "error",
                            "error": "VALIDATION_FAIL",
                            "message": "Username and password doesn't match."
                        });
                    }
                    
                })
                .catch(error => next(error));

        } else {
            // Username and/or password not provided. Forbid.
            response.sendStatus(400).json({
                "result": "error",
                "error": "WRONG_ARGS",
                "message": "Request body must have an username and a password"
            });
        }

    }

    async register(request, response, next) {

        const { username, password, retypePassword } = request.body;
        // Check passwords
        if (username && password && retypePassword && password === retypePassword) {
            const data = {
                username, password
            };
            userDAO.create(data)
                .then(_ => response.status(200).json({
                    'result': 'success',
                    'message': 'Registered successfully'
                }))
                .catch(error => next(error));
        } else {
            response.status(400).json({
                'result': 'error',
                'error': 'WORNG_ARGS',
                'message': 'Request body must have an username, a password and a retypePassword. Password and retypePassword must match'
            });
        }

    }

    async getAll(request, response, next) {
        userDAO.listAll()
            .then(users => response.status(200).json(users))
            .catch(error => next(error));
    }

    async getUserById(request, response, next) {
        const { id } = request.params;
        
        userDAO.findById(id).then(data => {
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(404).json({
                    "result": "error",
                    "error": 'NOT_FOUND',
                    "message": "User not found."
                });
            }

        }).catch(error => next(error));
    }

    async getCurrent(request, response, next) {
        // TODO enlace con DAO
        response.status(200).json({'user': 'me'});
    }

    async getUserTotalScore(request, response, next) {
        const { id } = request.params;
        
        gamePlayDAO.getUserTotalScore(id).then(data => {
            if (data) {
                response.status(200).json(data.find(user => user._id == id));
            } else {
                response.status(404).json({
                    "result": "error",
                    "error": "NOT_FOUND",
                    "message": "Player scores not found. Perhaps player doesn't exist"
                });
            }
        }).catch(error => next(error));
    }

    async deleteUser(request, response, next) {
        const { id } = request.params;

        userDAO.remove(id).then(data => {
            if (data) {
                response.status(200).json({
                    'result': 'success',
                    'deleted': data
                });
            } else {
                response.status(404).json({
                    'result': 'error',
                    'error': 'NOT_FOUND',
                    'message': "Deletion failed. User not found."
                });
            }
        }).catch(error => next(error));
        
    }

};

module.exports = new UserController();