import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  index: Number,
  guid: String,
  isActive: Boolean,
  weight: Number,
  name: {
    first: String,
    last: String
  },
  gender: String,
  picture: String,
  email: String,
  phone: Number,
  address: String,
  registered: { type: Date, default: Date.now },
  plan: { type: Schema.ObjectId, ref: 'Plan' },
  packs: [{ type: Schema.ObjectId, ref: 'Pack' }],
  packList: String
});
//const Pack = mongoose.model('Pack', PackSchema);

customerSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});
customerSchema.post('findOneAndRemove', { document: true }, (doc) => {
  console.log('%s has been deleted', doc._id);
});
// HOOK per posar en majuscules el nom al guardar
customerSchema.pre('save', async function (next) {
  //console.log('this.name.first', this.name.first);
  this.gender=await this.gender.toLowerCase();
  var oldName = this.name.first;
  if (this.isModified('name')) {
    this.name.first = await oldName.toUpperCase();
    console.log("%s has changed their name to %s", oldName, this.name.first);
  }
  next();
});
// HOOK per posar en majuscules el nom al actualitzar
customerSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.name!=undefined){
var oldName = this._update.name.first;
this._update.name.first = await oldName.toUpperCase();
  console.log("%s has changed their name to %s", oldName, this._update.name.first);
}
next();
});
// hook valid per a totes les consultes find()
customerSchema.post('init', function (doc) {
  //console.log('this.name.first', this.packs);
  let packs = [];
  (doc.packs).forEach(e => {
    packs.push(e.name);
  });
  doc.packList = packs.toString().replace(/,/g, ' / ').toUpperCase();
  //doc.plan.name=doc.plan.name.toUpperCase();
});
export default customerSchema;





