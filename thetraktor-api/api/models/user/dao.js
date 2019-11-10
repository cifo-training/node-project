//import mongoose from 'mongoose';
import User from './model.js';
import mongo from '../../mongo/MongoManager.js';

class userDAO {

    constructor(){
        mongo.connect();
    }


create(data){

    const user = new User(data);
    return user.save()
}

list(){
    return User.find()
    .lean();
}

checkUser(data){
    
    return User.findOne(data)
    .exec(); 
}
listOne(id){
    
    return User.findById(id)
    .exec();
}
update(id,data){
    return User.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
}
remove(id){
    
    return User.findByIdAndRemove(id,{useFindAndModify:false}).exec();
}



}

export default new userDAO();