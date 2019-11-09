import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

const setActive = async (request, response, next, active) => {
	try {
		const user = await userDAO.listOne (request.params.id);
		if (user) {
			const modifiedUser = await userDAO.update (request.params.id, {active: active});
			response.status (200).json (userDAO.cleanOne(modifiedUser));
		} else {
			response.status (400).json ({message: "User does not exist in DB"});
		}
	} catch (error) {
		return next (error);
	}	
}

export const activateUser = (request, response, next) => {
	setActive (request, response, next, true);
};

export const deactivateUser = (request, response, next) => {
	setActive (request, response, next, false);
};
