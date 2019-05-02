const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: { type: String, unique: true },
	address: String,
	zip: Number,
	created: { type: Date, default: Date.now() }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
