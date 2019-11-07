import mongoose from 'mongoose';
import UserSchema from './schema.mjs';

export default mongoose.model ("User", UserSchema);
