import mongoose from 'mongoose';
import CustomerSchema from './schema.js';

export default  mongoose.model("Customer", CustomerSchema);
//export const  Pack = mongoose.model("Pack", PackSchema);
