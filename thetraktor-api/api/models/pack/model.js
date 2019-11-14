import mongoose from 'mongoose';
import packSchema from './schema.js';

export default  mongoose.model("Pack", packSchema);
//export const  Pack = mongoose.model("Pack", PackSchema);
