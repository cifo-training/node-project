import thesaurusDAO from '../../models/thesaurus/dao.mjs';
import HTTPError from 'http-errors';

const update = async (request, response, next) => {
	try {
		if (request.body.thesaurus) {
			let object = await thesaurusDAO.listOne(request.params.id);
			if (object) {
				if (request.body.thesaurus.object)
					object.object = request.body.thesaurus.object;
				if (request.body.thesaurus.description)
					object.description = request.body.thesaurus.description;
				if (request.body.thesaurus.found)
					object.found = request.body.thesaurus.found;
				if (request.body.thesaurus.stored)
					object.stored = request.body.thesaurus.stored;
				if (request.body.thesaurus.weight)
					object.weight = request.body.thesaurus.weight;
				if (request.body.thesaurus.height)
					object.height = request.body.thesaurus.height;
				if (request.body.thesaurus.length)
					object.length = request.body.thesaurus.length;
				if (request.body.thesaurus.width)
					object.width = request.body.thesaurus.width;
				if (request.body.thesaurus.contact)
					object.contact = request.body.thesaurus.contact;
				const modifiedObject = await thesaurusDAO.update (request.params.id, object);
				response.status(200).json (thesaurusDAO.cleanOne(modifiedObject));
			} else {
				response.status(404).json ({message: "Object not found"});
			}
		} else {
			response.status(500).json ({message: "Nothing to be changed"})
		}
	} catch (error) {
		return next (error);
	}
};

export default update;
