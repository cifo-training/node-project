import planDAO from '../../models/plan/dao.js';

const update = async (req, res) => {
    try {
        //console.log(req.params.id);        
        if (!req.body || !req.params.id) {
            res.sendStatus(400);
        } else {
            //console.log(req.params.id);
            //console.log(req.body);
            const plan = await planDAO.update(req.params.id,req.body);
            res.json(plan);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default update;
