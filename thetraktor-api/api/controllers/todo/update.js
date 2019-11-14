import todoDAO from '../../models/todo/dao.js';

const update = async (req, res) => {
    try {
        //console.log(req.params.id);        
        if (!req.body || !req.params.id) {
            res.sendStatus(400);
        } else {
            //console.log(req.params.id);
            //console.log(req.body);
            const todo = await todoDAO.update(req.params.id,req.body);
            res.json(todo);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default update;
