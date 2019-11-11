import User from './model.js';
import mongo from '../../mongo/mongoManager.js';

class userDAO {

    constructor(){
        mongo.connect();
    }

    register(data){
        const user = new User(data);
        return user.save()
    }


    login(data){
        return User.findOne(data)
        .exec();
    }

}

export default new userDAO();