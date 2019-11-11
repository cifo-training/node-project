import userDao from '../../models/users/userDao.js';
import HTTPerror from 'http-errors';
import path from 'path';
import fs from 'fs';


const enviarFile = async(req, res,next) =>{
    try {
        const user = await userDao.listOne(req.params.id);
        if(!user){
            next(HTTPerror(400, {message:"usuario no existe"}));
        }
        let __dirname = path.resolve();
        
        if(user.img == undefined){
            let noImagePath = path.resolve(`${__dirname}/assets/no-image-icon.png`);
            res.sendFile(noImagePath);
        }else{
            let img = user.img;
            let pathImagen = path.resolve(`${__dirname}/uploads/${img}`);
            if (fs.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
            } else {
                let noImagePath = path.resolve(`${__dirname}/assets/no-image-icon.png`);
                res.sendFile(noImagePath);
            }
        }
    
    } catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }

}

export default enviarFile;