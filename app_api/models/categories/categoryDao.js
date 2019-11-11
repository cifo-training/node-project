import mongo from '../../../mongo/MongoManager.js';
import {Category} from '../model.js';



class categoryDao{
    constructor(){
        mongo.connect();
    }

    create(data){
        const category = new Category();
        Object.assign(category, data);
        return category.save();
    }

    list(){
        return Category.find().exec();
    }

    listOne(id){
        return Category.findById(id).exec();
    }

    listOneCategories(id){
        return Category.findById(id).select({"categoria": 1, "subcategoria": 1, "_id":0}).exec();
    }

}

export default new categoryDao();