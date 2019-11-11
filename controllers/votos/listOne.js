import votosDao from '../../models/votos/dao.js';

import HTTPError from 'http-errors'

const listOne =async (req,res,next) => {

    try {
            
            const filmVotado= await votosDao.listOne(req.params.id);

            if (filmVotado === null){
                res(HTTPError(404));
            };

           

            res.json(filmVotado);
        

    } catch (error) {

        next(HTTPError(404));
        
    }
}

export default listOne; 