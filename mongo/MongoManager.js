import mongoose from 'mongoose';
import config from '../config.js';
import dotenv from 'dotenv';
dotenv.config();


class MongoManager {

    
    constructor(config){
        this.config = config;
    }
    getConnectionURL(){
        return this.config;
    }

    isConnected(){
        mongoose.connection.on('connected',_=> true);
    }
    
    connect () {
        return mongoose.connect(this.getConnectionURL(),
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
      }
    
    disconnect(){
        mongoose.disconnect();
    }

}

export default new MongoManager(process.env.CONFIG);