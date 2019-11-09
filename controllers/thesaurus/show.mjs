import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const show = async (request, response, next) => {
	try {
		const object = await thesaurusDAO.listOne(request.params.id)
		if (object) {
			response.status(200).json (thesaurusDAO.cleanOne(object));
		} else {
			response.status(404).json({message: "Object not found"})
		}
	} catch (error) {
		return next (error);
	}
};

export default show;
