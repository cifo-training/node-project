import User from './model.mjs';
import mongo from '../../mongo/MongoManager.mjs';

class userDAO {
	
	constructor(){
		mongo.connect();
	}
	
	create(data){
		const user = new User(data);
		return user.save();
	}
	
	list(){
		return User.find().lean();
	}
	
	listFind(data){
		return User.find(data).exec();
	}
	
	checkUser(data){
		return User.findOne(data).exec();
	}
	
	listOne(id){
		return User.findById(id).exec();
	}
	
	update(id,data){
		return User.findByIdAndUpdate(id,data, {new:true, useFindAndModify:false}).exec();
	}
	
	remove(id){
		return User.findByIdAndRemove(id,{useFindAndModify:false}).exec();
	}
	
	cleanOne(user){
		delete user.password;
		delete user.__v;
	}
	
	cleanAll(users){
		users.forEach(user => cleanOne(user));
	}
};

export default new userDAO();
