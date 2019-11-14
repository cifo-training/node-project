import todoDAO from '../../models/todo/dao.js';

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(400);
        } else {

            const todo = await todoDAO.create(req.body);
            res.send(todo);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default create;