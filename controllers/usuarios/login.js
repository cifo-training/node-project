import auth from '../../middleware/auth.js';
import HTTPError from 'http-errors';

const login = async (req,res,next) => {

        try{

        if(!req.body.email || !req.body.password)
        next(error)

        const token = await auth(req.body);

        res.json({usuario:req.body.email, token:token})
        
        
        } catch(error){
            next(error);
        }
      };
      
export default login;
    
