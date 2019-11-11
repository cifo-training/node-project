import votosDao from '../../models/votos/dao.js';

const list =async (req,res,next)=> {

const filmVotado = await votosDao.list();


    try {
        if (req.query ['votos'] == 'true') {
            
            const film_number =filmVotado.length-1;
            filmVotado.push({film_number:film_number});

        };
            if (filmVotado === null){
                res(HTTPError(404));
            };

                res.json(filmVotado);

    }catch (err) {

        next(error);
    }

}

export default list;