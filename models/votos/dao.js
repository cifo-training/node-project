import Votos from './model.js';
import mongo from '../../mongo/mongoManager.js';

class votosDAO {

    constructor(){
        mongo.connect();
    }


create(data){

    const votos = new Votos(data);
    return votos.save()
}

list(){
    return Votos.find()
    .lean();
}

listOne(id){
    
    return Votos.findById(id)
    .exec();
}

update(id,data){
    return Votos.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false})
    .exec();
}
remove(id){
    
    return Votos.findByIdAndRemove(id,{useFindAndModify:false})
    .exec();
}



}

export default new votosDAO();