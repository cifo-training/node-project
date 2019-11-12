
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, unique: true},
    password: { type: String},
    signupDate: { type: Date, default: Date.now() },

})
UserSchema.pre('save', function(){
    
    this.password = bcrypt.hashSync(this.password, 10);
});

export default mongoose.model('User', UserSchema)