import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';
import bcrypt from 'bcrypt';

const saveNewUser = async (request) => {
	let user = await userDAO.listOne(request.params.id);
	if (user) {
		if (request.body.user.email)
			user.email = request.body.user.email;
		if (request.body.user.password) {
			user.password = await bcrypt.hash (request.body.user.password, 10);
		}
		return await userDAO.update (request.params.id, user);
	} else {
		return "";
	}
};

export const updateAsAdmin = async (request, response, next) => {
	try {
		if (request.body.isAdmin) {
			const modified = await saveNewUser(request);
			if (modified) {
				response.status(200).json (userDAO.cleanOne(modified));
			} else {
				response.status(404).json ({message: "User not found"});
			}
		} else {
			return next();
		}
	} catch (error) {
		return next (error);
	}
};

export const updateUser = async (request, response, next) => {
	try {
		const modified = await saveNewUser(request);
		if (modified) {
			response.status(200).json (modified);
		} else {
			response.status(404).json ({message: "User not found"});
		}
	} catch (error) {
		return next (error);
	}
};
