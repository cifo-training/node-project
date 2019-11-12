import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

class MongoManager {

    #config;

    constructor(config) {
        this.#config = config;
    }
    getMongoUrl() {
        return this.#config.MONGODB_URI;
    }
    connect() {
        return mongoose.connect(this.getMongoUrl(),
        {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});
    }
}

export default MongoManager;