import todoDAO from '../../models/todo/dao.js';

const list = async (req, res) => {

    try {

        const todos = await todoDAO.list();

        //Ejercicio 22: Contar alumnos o proyectos; 
        //si el parámetro count es true envía núm de estudiantes sino el array de estudiantes.      
        if (req.query['count'] == 'true') {

            if (req.query['todos'] == 'true') {

                const todosCount = todos.map(doc => doc.todos.length)
                        .reduce((a, c) => a + c || 0, 0);
                        todos.push({ todos_number: todosCount });
            }
            
            if (req.query['todo'] == 'true') {

                const todos_number = todos.length-1;
                todos.push({ todos_number: todos_number });
            }    
                    
            
        }

            res.json(todos);
        
        } catch (error) {

            throw error;
        }
    }

export default list;