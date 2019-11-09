import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const update = async (request, response, next) => {
	try {
		let object = await thesaurusDAO.listOne(request.params.id);
		if (request.body.object.object)
			object.object = request.body.object.object;
		if (request.body.object.description)
			object.description = request.body.object.description;
		if (request.body.object.found)
			object.found = request.body.object.found;
		if (request.body.object.stored)
			object.stored = request.body.object.stored;
		if (request.body.object.weight)
			object.weight = request.body.object.weight;
		if (request.body.object.height)
			object.height = request.body.object.height;
		if (request.body.object.length)
			object.length = request.body.object.length;
		if (request.body.object.width)
			object.width = request.body.object.width;
		if (request.body.object.contact)
			object.contact = request.body.object.contact;
		const modifiedObject = await thesaurusDAO.update (request.params.id, object);
		response.status(200).json (thesaurusDAO.cleanOne(modifiedObject));
	} catch (error) {
		return next (error);
	}
};

export default update;
