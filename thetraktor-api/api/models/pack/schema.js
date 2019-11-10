import mongoose from 'mongoose';
import CustomerSchema from '../customer/schema.js'

const Schema = mongoose.Schema;

const packSchema = new Schema({
  index: Number,
  name: String,
  description: String,
  image: String,
  price: Number,
  customers:  [{ type: Schema.ObjectId, ref: 'Customer' }]

});
//const Customer = mongoose.model('Customer', CustomerSchema);

packSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});
packSchema.post('findOneAndDelete',{document:true}, (doc) => {
  console.log('%s has been deleted', doc._id);
});

packSchema.pre('save',async function (next) {
  var oldName = this.name;
  if (this.isModified('name')) {
      this.name = await oldName.toUpperCase();
      console.log("%s has changed their name to %s", oldName, this.name);
  }
  next();
});  
packSchema.post('init', function (doc) {
  doc.name=doc.name.toUpperCase();
});
export default packSchema;