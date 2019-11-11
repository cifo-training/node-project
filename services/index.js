import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const createToken = usuario => {
  
    
  let token = jwt.sign({usuario: usuario}, process.env.SECRET_TOKEN,{ expiresIn:  60 * 60 * 24 * 30 });

    return token

}

export default createToken;