import mongoose from 'mongoose';
//import config from '../config/config.js';

class MongoManager {

    //#config;
    
    constructor(config){
        this._config = config;
    }
    getConnectionURL(){
        return this._config;
    }

    isConnected(){
        mongoose.connection.on('connected',_=> true);
    }
    
    connect () {
        return mongoose.connect(this.getConnectionURL(),
        { useNewUrlParser: true, useUnifiedTopology: true });
      }
    
    disconnect(){
        mongoose.disconnect();
    }

}

export default new MongoManager(process.env.MONGODB_URI);