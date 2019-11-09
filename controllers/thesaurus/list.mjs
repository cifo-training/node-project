import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const list = async (request, response, next) => {
	try {
		const objects_list = await thesaurusDAO.list();
		response.status(200).json (thesaurusDAO.cleanAll(objects_list));
	} catch (error) {
		return next (error);
	}
};

export default list;
