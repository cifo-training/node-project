import mongoose from 'mongoose';

const isValidId = (request, response, next) => {
	if (request.params.id) {
		if (mongoose.Types.ObjectId.isValid (request.params.id)) {
			next();
		} else {
			response.status(400).json ({message: "Bad parameter"});
		}
	} else {
		response.status (400).json ({message: "Missing parameter"});
	}
};

export default isValidId;
