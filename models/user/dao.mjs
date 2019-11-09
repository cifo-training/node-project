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
		return User.find(data).lean();
	}
	
	checkUser(data){
		return User.findOne(data).lean();
	}
	
	listOne(id){
		return User.findById(id).lean();
	}
	
	update(id,data){
		return User.findByIdAndUpdate(id,data, {new:true, useFindAndModify:false}).lean();
	}
	
	remove(id){
		return User.findByIdAndRemove(id,{useFindAndModify:false}).lean();
	}
	
	cleanOne(user){
		try {
			JSON.parse(user);
		} catch (error) {
			user = JSON.parse(JSON.stringify(user));
		}
		delete user.password;
		delete user.__v;
		return user;
	}
	
	cleanAll(users){
		users.forEach((user,i,arr) => arr[i] = this.cleanOne(user));
		return users;
	}
};

export default new userDAO();
