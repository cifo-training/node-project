import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const thesaurusSchema = new Schema ({
	object: {
		type: String,
		required: true
	},
	description: String,
	found: {
		type: String,
		required: true
	},
	stored: {
		type: String,
		required: true
	},
	weight: Decimal28,
	height: Decimal128,
	length: Decimal128,
	width: Decimal128,
	contact: {
		type: String,
		required: true
	}
});

export default thesaurusSchema;
