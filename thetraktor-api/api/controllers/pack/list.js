import packDAO from '../../models/pack/dao.js';

const list = async (req, res) => {

    try {

        const packs = await packDAO.list();

        //Ejercicio 22: Contar alumnos o proyectos; 
        //si el parámetro count es true envía núm de estudiantes sino el array de estudiantes.      
        if (req.query['count'] == 'true') {

            if (req.query['packs'] == 'true') {

                const packsCount = packs.map(doc => doc.packs.length)
                        .reduce((a, c) => a + c || 0, 0);
                        packs.push({ packs_number: packsCount });
            }
            
            if (req.query['pack'] == 'true') {

                const packs_number = packs.length-1;
                packs.push({ packs_number: packs_number });
            }    
                    
            
        }

            res.json(packs);
        
        } catch (error) {

            throw error;
        }
    }

export default list;