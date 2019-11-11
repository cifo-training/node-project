const mongoose = require('mongoose');

const UserSchema = require('../schemas/index.js').UserSchema;

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;