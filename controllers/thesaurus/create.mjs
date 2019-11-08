import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const create = async (request, response, next) => {
	try {
		if (request.body.thesaurus) {
			const object = await thesaurusDAO.create(Object.assign({}, request.body.thesaurus));
			response.status(200).json (object);
		} else {
			response.status(400).json ({message: "Missing data"});
		}
	} catch (error) {		
		return next(error);
	}
};

export default create;
