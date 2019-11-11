class HomeController {

    async index(request, response, next) {

        response.status(200).json({
            'message': "welcome"
        });

    }

    async unauthorized(request, response, next) {

        response.status(401).json({
            'message': "unauthorized"
        });

    }
};


module.exports = new HomeController();
//export default new HomeController();