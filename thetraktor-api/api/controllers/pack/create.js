import packDAO from '../../models/pack/dao.js';

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(400);
        } else {

            const pack = await packDAO.create(req.body);
            res.send(pack);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default create;