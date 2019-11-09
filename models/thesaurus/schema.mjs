import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const decimal2JSON = (v,i,prev) => {
	if (v !== null && typeof v === 'object') {
		if (v.constructor.name === 'Decimal128') {
			prev[i] = v.toString();
		} else {
			Object.entries(v).forEach(([key,value]) => decimal2JSON(value, key, prev ? prev[i] : v));
		}
	}
}

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

thesaurusSchema.set('toJSON', {
	transform: (doc, ret) => {
		decimal2JSON(ret);
		return ret;
	}
});

export default thesaurusSchema;
