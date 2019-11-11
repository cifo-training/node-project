import votosDao from '../../models/votos/dao.js';

import HTTPError from 'http-errors'

const remove = async (req,res,next) => {

    try {

        if (!req.params && req.params.id) {

            next (HTTPError(404));
        }else{

            const nom= await votosDao.listOne({_id:req.params.id});


            await votosDao.remove(req.params.id);


            res.json(`The movie: ${nom.Title} has been deleted successfully`);
        }
        
    } catch (error) {

        next (error);
        
    }
}

export default remove;