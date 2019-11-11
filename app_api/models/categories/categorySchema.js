import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;


let categorySchema = new Schema({
    categoria: { type: String, unique: true, required: [true, 'La categoria es obligatoria'] },
    subcategoria: [String]
});

// categorySchema.plugin(uniqueValidator, {
//     message: 'La {PATH} debe de ser única'
// });


categorySchema.plugin(uniqueValidator, { message: 'La {PATH} debe de ser única' });


export default categorySchema;