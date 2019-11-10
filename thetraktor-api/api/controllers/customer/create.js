import customerDAO from '../../models/customer/dao.js';

const create = async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(400);
        } else {

            const customer = await customerDAO.create(req.body);
            res.send(customer);
        }
    } catch (error) {
        res.send('ha habido un error');
        throw error;
    }
}

export default create;