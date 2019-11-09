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
	
	cleanOne(obj){
		try {
			JSON.parse(obj);
		} catch (error) {
			obj = JSON.parse(JSON.stringify(obj));
		}
		delete obj.__v;
		return obj;
	}
	
	cleanAll(objs){
		objs.forEach((obj,i,arr) => arr[i] = this.cleanOne(obj));
		return objs;
	}
};

export default new thesaurusDAO();
