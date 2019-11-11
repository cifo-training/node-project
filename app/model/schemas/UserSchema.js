const mongoose = require('mongoose');

const encryptPassword = require('../../utils/passwords.js').encryptPassword;

// CREATE SCHEMA
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

// SCHEMA METHODS
UserSchema.static('findByName', function(username) {
    return this.findOne({ username });
});

UserSchema.static('findById', function(id) {
    return this.findOne({ '_id': id });
});


// MIDDLEWARE
UserSchema.pre('save', async function() {
    this.password = await encryptPassword(this.password);
    return this;
});


module.exports = UserSchema;