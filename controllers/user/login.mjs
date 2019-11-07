import userDAO from '../../models/user/dao.mjs';
import {generateAccessToken} from '../../middleware/auth.mjs';

const login = async (request, response, next) => {
	try {
		const user = await userDAO.checkUser({name:request.sender.name});
		const token = await generateAccessToken(user);
		response.status(200).json({token});
	} catch (error) {
		next(error);
	}
};

export default login;
