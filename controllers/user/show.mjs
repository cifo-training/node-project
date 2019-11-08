import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

const show = async (request, response, next) => {
	try {
		if (!request.body.isAdmin) {
			const user = await userDAO.listOne(request.user);
			if (user) {
				response.status (200).json (user);
			} else {
				response.status (404).json ({message:"User not found"});
			}
		} else {
			return next();	
		}
	} catch (error) {
		return next (error);
	}
};

export default show;
