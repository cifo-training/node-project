import mongoose from 'mongoose';
import todoSchema from './schema.js';

export default  mongoose.model("Todo", todoSchema);
