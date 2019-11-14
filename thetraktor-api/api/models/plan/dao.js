import Plan from './model.js';
import mongo from '../../mongo/MongoManager.js';

class planDAO {

    constructor(){
        mongo.connect();
    }


create(data){   
    const plan = new Plan();
    Object.assign(plan, data);
    return plan.save();
}

list(){
    return Plan.find().sort( { index: 1 } ).exec();
}

listOne(id){
    
    return Plan.findById(id).exec();
}
update(id,data){
    return Plan.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
}
remove(id){
    
    return Plan.findByIdAndRemove(id,{useFindAndModify:false}).exec();
}



}

export default new planDAO();