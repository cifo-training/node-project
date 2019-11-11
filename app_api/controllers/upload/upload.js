import userDao from '../../models/users/userDao.js';
import {User} from '../../models/model.js';
import HTTPerror from 'http-errors';
import fs from 'fs';

const upload = async(req, res,next) =>{

    try {
        let id = req.params.id;
        if (!req.files) {
            next(HTTPerror(400, {message:'No hay imagen seleccionada'}));  
        }

          // Obtener nombre del archivo
        let archivo = req.files.imagen;
        let nombreCortado = archivo.name.split('.');
        let extensionArchivo = nombreCortado[nombreCortado.length - 1];

        // Solo estas extensiones aceptamos
        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionesValidas.indexOf(extensionArchivo) < 0) {
            console.log("entre");
            next(HTTPerror(400, {message:'Extension no válida,Las exenciones válidas son ' + extensionesValidas.join(', ')})); 
        }

        // Nombre de archivo personalizado
        let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

         //Mover el archivo de temporal a un path
        let path = `./uploads/${nombreArchivo}`;

        archivo.mv(path, err => {
            if (err) {
                next(HTTPerror(400, {message:'Error al mover imagen'}));  
            }
    
            User.findById(id, (err, usuario) => {

                if (!usuario) {
                    next(HTTPerror(400, {message:'Usuario no existe'}));  
                }
    
                var pathViejo = './uploads' + usuario.img;
                // Si existe elimina la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlinkSync(pathViejo);
                }
                usuario.img = nombreArchivo;
    
                usuario.save((err, usuarioActualizado) => {
    
                    usuarioActualizado.password = ':)';
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    });
                });
    
            });
        });

    } catch (err) {
        next(HTTPerror(err.code, {message:err.message}));
        
    }
}


export default upload;