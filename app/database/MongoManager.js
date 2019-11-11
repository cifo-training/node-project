const mongoose = require('mongoose');

const config = require('../config/env-config.js');

class MongoManager {
    
    constructor(config){
        this._config = config;
    }
    
    getConnectionURL(){
        return this._config.MONGODB_URI;
    }
    
    connect() {
        return mongoose.connect(this.getConnectionURL(), { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
    
    disconnect(){
        mongoose.disconnect();
    }
}

module.exports = new MongoManager({ MONGODB_URI: config.MONGODB_URI });