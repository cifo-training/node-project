import mongoose from 'mongoose';
//import uuidv4 from 'uuid';
//import CustomerSchema from '../customer/schema.js'

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  index: Number,
  task: String,
  type: Number,
  section: Number,
  registerdate: { type: Date, default: Date.now },
  state: String,
  description: String,
  disabled: Boolean,
  todotask: [{
    id: Number,
    todotaskid: String,
    task: String,
    registerdate: { type: Date, default: Date.now },
    state: String,
    disabled: Boolean,
  }]
});
//const Customer = mongoose.model('Customer', CustomerSchema);

todoSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});
todoSchema.post('findOneAndDelete',{document:true}, (doc) => {
  console.log('%s has been deleted', doc._id);
});
todoSchema.pre('save', async function (next) {
  //this.todoid=await uuidv4.v4();
  next();
});

export default todoSchema;