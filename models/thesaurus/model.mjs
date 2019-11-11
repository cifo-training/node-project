import mongoose from 'mongoose';
import ThesaurusSchema from './schema.mjs';

export default mongoose.model ("Thesaurus", ThesaurusSchema);
