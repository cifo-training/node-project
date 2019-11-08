import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const list = async (request, response, next) => {
	try {
		const objects_list = await thesaurusDAO.list();
		objects_list.forEach (object => {delete object.__v});
		response.status(200).json (objects_list);
	} catch (error) {
		return next (error);
	}
};

export default list;
