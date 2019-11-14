import mongoose from 'mongoose';
//import CustomerSchema from '../customer/schema.js'

const Schema = mongoose.Schema;

const planSchema = new Schema({
  index: Number,
  name: String,
  icon: String,
  price: Number,
  customers:  [{ type: Schema.ObjectId, ref: 'Customer' }],
  options: [{option: String}]
});
//const Customer = mongoose.model('Customer', CustomerSchema);

planSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});
planSchema.post('findOneAndDelete',{document:true}, (doc) => {
  console.log('%s has been deleted', doc._id);
});

planSchema.pre('save',async function (next) {
  var oldName = this.name;
  if (this.isModified('name')) {
      this.name = await oldName.toUpperCase();
      console.log("%s has changed their name to %s", oldName, this.name);
  }
  next();
});  
planSchema.post('init', function (doc) {
  doc.name=doc.name.toUpperCase();
});

export default planSchema;