import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import HTTPerror from 'http-errors';

const Schema = mongoose.Schema;

// value el valor introducido
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        minlength: [5, 'El nombre necesita más caracteres']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario'],
        minlength: [5, 'El email necesita más caracteres'],
        match: [/.+\@.+\..+/, 'El email no cumple el formato']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        minlength: [5, 'El password necesita más caracteres']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    ca: {
        type: Schema.ObjectId, ref: 'ShoppingCart'
    },
    img: String 
    
});

// userSchema.pre('save', function() {
//     this.password = bcrypt.hashSync(this.password, 10);
//   });





userSchema.methods.toJSON = function() {
    try{
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
    }
    catch(err){
        next(HTTPerror(500, {message:"error en convertir json"}));
    }
}

// userSchema.plugin(uniqueValidator, {
//     message: 'El {PATH} debe de ser único'
// });


export default userSchema;

