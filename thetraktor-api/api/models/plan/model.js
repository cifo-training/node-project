import mongoose from 'mongoose';
import planSchema from './schema.js';

export default  mongoose.model("Plan", planSchema);
//export const  Pack = mongoose.model("Pack", PackSchema);
