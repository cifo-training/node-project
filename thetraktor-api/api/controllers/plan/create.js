import planDAO from '../../models/plan/dao.js';

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(400);
        } else {

            const plan = await planDAO.create(req.body);
            res.send(plan);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default create;