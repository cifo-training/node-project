import Customer from './model.js';
import mongo from '../../mongo/MongoManager.js';

class customerDAO {

    constructor(){
        mongo.connect();
    }
create(data){
   
    const customer = new Customer();
    Object.assign(customer, data);

    return customer.save();
}

listActive(){
    return Customer.find({"isActive":true}).populate('plan').populate('packs').exec();
}
listInactive(){
    return Customer.find({"isActive":false}).populate('plan').populate('packs').exec();
}
listPlan(plan_id){
    return Customer.find({"plan":{$in:plan_id}}).populate('plan').populate('packs').exec();
}

listOne(id){
    
    return Customer.findById(id).populate('plan').populate('packs').exec();
}
update(id,data){
    return Customer.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).populate('plan').exec();
}
remove(id){   
    return Customer.findByIdAndRemove(id,{useFindAndModify:false}).exec();
}



}

export default new customerDAO();