import filmDao from '../../models/films/dao.js';

import HTTPError from 'http-errors'

const listOne =async (req,res,next) => {

    try {
            
            const film= await filmDao.listOne(req.params.id);

            if (film === null){
                res(HTTPError(404));
            };

           

            res.json(film);
        

    } catch (error) {

        next(HTTPError(404));
        
    }
}

export default listOne;