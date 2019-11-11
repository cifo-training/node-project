import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// si el precio del producto cambia se elimina del carro
var ProductCart = new Schema({
    product: { type: Schema.ObjectId, ref: 'Product' },
    precio: Number,
    descuento: Number,
    cantidad: Number
})

var ShoppingCart = new Schema({
    estado: { type: String, default: 'activo', required: [true, 'El estado es obligatorio'] },
    fecha: { type: Date, default: Date.now },
    total: { type: Number, default: 0, required: [true, 'El total es obligatorio'] },
    expired: { type: Date },
    products: [ProductCart],
    user: { type: Schema.ObjectId, ref: 'User' }
});


export default ShoppingCart;