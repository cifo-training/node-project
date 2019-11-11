import filmDao from '../../models/films/dao.js'

const list = async (req,res,next)=> {

const films = await filmDao.list();

    try {
        if (req.query ['film'] == 'true') {
            
            const film_number = film.length-1;
            film.push({film_number:film_number});

        };
            // if (film === null){
            //     res(HTTPError(404));
            // };

                res.json(films);

    }catch (err) {

        next(error);
    }

}

export default list;