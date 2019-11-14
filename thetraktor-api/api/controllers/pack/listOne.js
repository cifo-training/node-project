import packDAO from '../../models/pack/dao.js';

const listOne = async (req, res) => {

    try {

        console.log(req.params.id)
        if (!req.params.id) {
            res.sendStatus(400);
        } else {

            const pack = await packDAO.listOne(req.params.id);

            res.json(pack);
        }
    } catch (error) {

        throw error;
    }
}

export default listOne;