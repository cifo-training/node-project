import customerDAO from '../../models/customer/dao.js';

const list = async (req, res) => {
    try {

        const customers = await customerDAO.listActive();

        if (req.query['count'] == 'true') {
            if (req.query['packs'] == 'true') {

                const packsCount = customers.map(doc => doc.packs.length)
                        .reduce((a, c) => a + c || 0, 0);
                customers.push({ packs_number: packsCount });
            }
            
            if (req.query['customer'] == 'true') {

                const customers_number = customers.length-1;
                customers.push({ customers_number: customers_number });
            }    
        }

            res.json(customers);
       
        } catch (error) {

            throw error;
        }
    }

export default list;