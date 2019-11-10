import Pack from './model.js';
import mongo from '../../mongo/MongoManager.js';

class packDAO {

    constructor(){
        mongo.connect();
    }


create(data){   
    const pack = new Pack();
    Object.assign(pack, data);
    return pack.save();
}

list(){
    return Pack.find().exec();
}

listOne(id){
    
    return Pack.findById(id).exec();
}
update(id,data){
    return Pack.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
}
remove(id){
    
    return Pack.findByIdAndRemove(id,{useFindAndModify:false}).exec();
}



}

export default new packDAO();