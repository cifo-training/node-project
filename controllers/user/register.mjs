import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

const register = async (request, response, next) => {
	request.body.user.active = request.body.isAdmin;
	try {
		let missing_fields = "";
		if (!request.body.user.name)
			missing_fields += "name ";
		if (!request.body.user.password)
			missing_fields += "password ";
		if (!request.body.user.email)
			missing_fields += "email ";
		missing_fields = missing_fields.substring(0, missing_fields.length-1);
		if (missing_fields !== "") {
			response.status(400).json ({message: `Missing fields: ${missing_fields}`});
		} else {
			if (await userDAO.checkUser ({name: request.body.user.name})){
				response.status(400).json({message: "User already exists in BD"});
			} else {
				const user = await userDAO.create(Object.assign({}, request.body.user));
				response.status(200).json (cleanOne(user));
			}
		}
	} catch (error) {		
		return next(error);
	}
};

export default register;
