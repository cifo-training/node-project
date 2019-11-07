import mongoose from 'mongoose';

class MongoManager {
	
	#config;
	
	constructor(mongo_url){
		this.#config = mongo_url;
	}
	
	getConnectionURL(){
		return this.#config;
	}
	
	isConnected(){
		mongoose.connection.on('connected',_=> true);
	}
	
	connect(){
		return mongoose.connect (this.getConnectionURL(),
			{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
	}
	
	disconnect(){
		mongoose.disconnect();
	}
};

export default new MongoManager (process.env.MONGODB_URI);
