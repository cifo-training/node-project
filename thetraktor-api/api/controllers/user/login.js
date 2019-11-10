import {generateAccessToken} from '../../middleware/auth.js';

const login = async (req,res,next) => {

    try{

    const token = await generateAccessToken(req.user);
    
    res.json({user:req.user, token:token});
    } catch(error){
        next(error);
    }
  };
  
  export default login;



