import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const remove = async (request, response, next) => {
	try {
		const object = await thesaurusDAO.listOne (request.params.id);
		if (object) {
			await thesaurusDAO.remove (request.params.id);
			response.status (200).json ({message: `Object successfully deleted: ${object.object}`});
		} else {
			response.status (404).json ({message: "Object identifier does not exist"});
		}
	} catch (error) {
		return next (error);
	}
};

export default remove;
