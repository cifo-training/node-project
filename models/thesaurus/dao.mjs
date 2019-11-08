import Thesaurus from './model.mjs';
import mongo from '../../mongo/MongoManager.mjs';

class thesaurusDAO {
	
	constructor(){
		mongo.connect();
	}
	
	create(data){
		const thesaurus = new Thesaurus(data);
		return thesaurus.save();
	}
	
	list(){
		return Thesaurus.find().lean();
	}
	
	listFind(data){
		return Thesaurus.find(data).exec();
	}
	
	listOne(id){
		return Thesaurus.findById(id).exec();
	}
	
	update(id,data){
		return Thesaurus.findByIdAndUpdate(id,data, {new:true, useFindAndModify:false}).exec();
	}
	
	remove(id){
		return Thesaurus.findByIdAndRemove(id,{useFindAndModify:false}).exec();
	}
};

export default new thesaurusDAO();
