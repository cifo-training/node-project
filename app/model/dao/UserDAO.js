const mongo = require('../../database/MongoManager.js'); 
const UserModel = require('../models/UserModel.js');

class UserDAO {

    constructor() {
        mongo.connect();
    }

    create(data) {
        const user = new UserModel(data);
        return user.save();
    }

    listAll() {
        return UserModel.find().exec();
    }

    findById(id) {
        return UserModel.findById(id);
    }

    findByUsername(username) {
        return UserModel.findOne({username});
    }

    update(id, data){
        return UserModel.findByIdAndUpdate(id, data, {
            new: true, 
            useFindAndModify: false
        }).exec();
    }
    remove(id) {
        return UserModel.findByIdAndRemove(id, {
            useFindAndModify: false
        }).exec();
    }

};

module.exports = new UserDAO();