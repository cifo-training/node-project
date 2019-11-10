import customerDAO from '../../models/customer/dao.js';

const update = async (req, res) => {
    try {
        //console.log(req.params.id);        
        if (!req.body || !req.params.id) {
            res.sendStatus(400);
        } else {
            //console.log(req.params.id);
            //console.log(req.body);
            const customer = await customerDAO.update(req.params.id,req.body);
            res.json(customer);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default update;
