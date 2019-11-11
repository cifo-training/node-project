import jwt from 'jsonwebtoken';

const createToken = (user) => {
  console.log(user[0].email);
   return jwt.sign({
        "email": user[0].email, 
   },  process.env.TOKEN, { expiresIn: process.env.EXPIRETOKEN});
} 

const verifyToken = async (token) => {
    try {
        var decoded = await jwt.verify(token, process.env.TOKEN);
        return decoded;
      } catch(err) {
        return err;
      }
}

export {createToken, verifyToken};