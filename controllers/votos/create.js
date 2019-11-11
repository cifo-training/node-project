import votosDao from '../../models/votos/dao.js';

import HTTPError from 'http-errors'

const create = async (req,res,next) => {

    try {

        const filmNuevo= await votosDao.create (Object.assign ({},req.body));

        res.send(filmNuevo);
        
    } catch (error) {

        next(error)
        
    }
}

export default create;