import planDAO from '../../models/plan/dao.js';

const listOne = async (req, res) => {

    try {

        console.log(req.params.id)
        if (!req.params.id) {
            res.sendStatus(400);
        } else {

            const plan = await planDAO.listOne(req.params.id);

            res.json(plan);
        }
    } catch (error) {

        throw error;
    }
}

export default listOne;