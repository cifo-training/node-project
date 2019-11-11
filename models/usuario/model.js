import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});

//Encripta la contraseña
UserSchema.pre('save', async function (next) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
  
      return next();
  
    } catch (error) {
      return next(error);
    }
  });




export default mongoose.model('Usuario',UserSchema);