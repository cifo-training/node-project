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
	weight: mongoose.Decimal128,
	height: mongoose.Decimal128,
	length: mongoose.Decimal128,
	width: mongoose.Decimal128,
	contact: {
		type: String,
		required: true
	}
});

export default thesaurusSchema;
