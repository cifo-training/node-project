/*
import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

const list = async (request, response, next) => {
	try {
		const users_list = (!request.query.active)
				? await userDAO.list()
				: await userDAO.listFind ({active: request.query.active === "true"});
		response.status(200).json (users_list);
	} catch (error) {
		return next (error);
	}
};
*/

const list = async (request, response, next) => {
	response.status (200).json ({message: "Llistat Ok !!!"});
}

export default list;
