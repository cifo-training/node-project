import packDAO from '../../models/pack/dao.js';

const update = async (req, res) => {
    try {
        console.log(req.params.id);        
        if (!req.body || !req.params.id) {
            res.sendStatus(400);
        } else {
            console.log(req.params.id);
            console.log(req.body);
            const pack = await packDAO.update(req.params.id,req.body);
            res.json(pack);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default update;
