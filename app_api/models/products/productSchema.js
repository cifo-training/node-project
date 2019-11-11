import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ofertaSchema = new Schema({
    descuento: {type: Number, min: [1, 'El descuento ha de ser mayor de 0'] },
    createAt: {type: Date, default: Date.now()},
    expires: {type:Date}
});

const promocionSchema = new Schema({
    promocion: String,
    novedad: {type:Boolean, default: true},
    createAt: {type: Date, default: Date.now()},
    expires: {type:Date}
});


const productSchema = new Schema({
    nombre: {   type: String, 
                unique: true,
                required: [true, 'El nombre es necesario'],
                minlength: [5, 'El nombre necesita más caracteres'],
            },
    p: { type: Number, alias: 'precioUnitario',
        required: [true, 'El precio únitario es necesario'],
        min: [1, 'El precio ha de ser mayor de 0'] },
    cantidad: { type: Number, required: [true, 'La cantidad es necesaria'] },
    categoria: { type: Schema.ObjectId, ref: 'Categories', required: true },
    i: { type: String, alias: 'imagen' },
    promocion: promocionSchema,
    oferta: ofertaSchema,
    shoppingCart: [{ type: Schema.ObjectId, ref: 'ShoppingCart' }],
});


export default productSchema;







