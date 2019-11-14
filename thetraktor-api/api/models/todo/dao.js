import Todo from './model.js';
import mongo from '../../mongo/MongoManager.js';

class todoDAO {

    constructor() {
        mongo.connect();
    }

    create(data) {
        const todo = new Todo();
        Object.assign(todo, data);
        return todo.save();
    }

    list() {
        return Todo.find().sort({ index: 1 }).exec();
    }

    listOne(id) {
        return Todo.findById(id).exec();
    }

    update(id, data) {
        return Todo.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false }).exec();
    }

    remove(id) {
        return Todo.findByIdAndRemove(id, { useFindAndModify: false }).exec();
    }

}

export default new todoDAO();