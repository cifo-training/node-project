import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
	name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: "false"
	}
});

userSchema.pre ('save', async function (next) {
	try {
		this.password = await bcrypt.hash (this.password, 10);
		return next();
	} catch (error) {
		return next(error);
	}
});

export default userSchema;
