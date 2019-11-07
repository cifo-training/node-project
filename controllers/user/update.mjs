import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';
import bcrypt from 'bcrypt';

export const updateAsAdmin = async (request, response, next) => {
	try {
		if (request.body.isAdmin) {
			let user = await userDAO.listOne(request.params.id);
			if (request.body.user.email)
				user.email = request.body.user.email;
			if (request.body.user.password) {
				user.password = await bcrypt.hash (request.body.user.password, 10);
			}
			const modifiedUser = await userDAO.update (request.params.id, user);
			response.status(200).json (modifiedUser);
		} else {
			return next();
		}
	} catch (error) {
		return next (error);
	}
};
