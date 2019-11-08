import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

const list = async (request, response, next) => {
	try {
		const users_list = (!request.query.active)
				? await userDAO.list()
				: await userDAO.listFind ({active: request.query.active === "true"});
		users_list.forEach (user => {delete user.password; delete user.__v});
		response.status(200).json (users_list);
	} catch (error) {
		return next (error);
	}
};

export default list;
