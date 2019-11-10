import todoDAO from '../../models/todo/dao.js';

const listOne = async (req, res) => {

    try {

        console.log(req.params.id)
        if (!req.params.id) {
            res.sendStatus(400);
        } else {

            const todo = await todoDAO.listOne(req.params.id);

            res.json(todo);
        }
    } catch (error) {

        throw error;
    }
}

export default listOne;