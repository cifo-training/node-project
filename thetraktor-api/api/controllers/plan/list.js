import planDAO from '../../models/plan/dao.js';

const list = async (req, res) => {

    try {

        const plans = await planDAO.list();

        //Ejercicio 22: Contar alumnos o proyectos; 
        //si el parámetro count es true envía núm de estudiantes sino el array de estudiantes.      
        if (req.query['count'] == 'true') {

            if (req.query['plans'] == 'true') {

                const plansCount = plans.map(doc => doc.plans.length)
                        .reduce((a, c) => a + c || 0, 0);
                        plans.push({ plans_number: plansCount });
            }
            
            if (req.query['plan'] == 'true') {

                const plans_number = plans.length-1;
                plans.push({ plans_number: plans_number });
            }    
                    
            
        }

            res.json(plans);
        
        } catch (error) {

            throw error;
        }
    }

export default list;