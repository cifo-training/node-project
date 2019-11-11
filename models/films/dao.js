//import mongoose from 'mongoose';
import Film from './model.js';
import mongo from '../../mongo/mongoManager.js';

class filmDAO {

    constructor(){
        mongo.connect();
    }


create(data){

    const movie = new Film(data);
    return movie.save()
}

list(){
    return Film.find()
    .lean();
}

listOne(id){
    
    return Film.findById(id)
    .exec();
}
update(id,data){
    return Film.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
}
remove(id){
    
    return Film.findByIdAndRemove(id,{useFindAndModify:false}).exec();
}



}

export default new filmDAO();