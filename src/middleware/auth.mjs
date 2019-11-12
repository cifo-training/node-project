
import services from './token.mjs';

function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ mesage: 'No tiene autorización' });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log("token ", token);

    services.decodeToken(token)
        .then(response => {
            console.log("_id usuario  ", response);
            req.user = response;
            next();
        })
        .catch(response => {
            console.log("error");
            res.status(response.status);
        })
}

export default isAuth;