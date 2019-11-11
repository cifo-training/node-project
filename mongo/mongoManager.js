import mongoose from 'mongoose';

class MongoManager {
    
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

//export default new MongoManager("mongodb+srv://filmVote:DB_myMongoOn@filmvote-hykau.mongodb.net/filmVote?retryWrites=true&w=majority"pr);
export default new MongoManager(process.env.MONGODB_URI);