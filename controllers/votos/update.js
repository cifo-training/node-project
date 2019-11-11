import votosDao from '../../models/votos/dao.js';

import HTTPError from 'http-errors';

const update = async (req,res,next) => {

    try {

        const nom= await votosDao.listOne({_id:req.params.id}); 

       

        await votosDao.update(req.params.id,req.body);

        res.json(`The movie: ${nom.Title} has been updated successfully`);

    }catch (error) {

        next (HTTPError(400));

    }
}

export default update;
