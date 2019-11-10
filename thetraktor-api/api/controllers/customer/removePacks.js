import customerDAO from '../../models/customer/dao.js';

const removePacks = async (req, res) => {

    try {

        console.log(req.params.id)
        if (!req.params.id) {
            res.sendStatus(400);
        } else {

            const customer = await customerDAO.update(req.params.id,{packs:[]});

            res.json(customer);
        }

    } catch (error) {

        throw error;
    }
}

export default removePacks;