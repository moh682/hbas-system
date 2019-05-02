const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new mongoose.Schema({
	reg: { type: String, required: true },
	brand: String,
	model: String,
	year: Number,
	users: [ { type: Schema.Types.ObjectId, ref: 'User', default: null } ],
	invoices: [ { type: Schema.Types.ObjectId, ref: 'Invoice', default: null } ]
});

// before on save
CarSchema.pre('save', function(next) {
	console.log('is about to be saved');
	next();
});

var Car = mongoose.model('Car', CarSchema);
module.exports = Car;
