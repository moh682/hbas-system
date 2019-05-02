const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
	method: String,
	price: Number,
	date: { type: Date, default: Date.now() }
});

var SparePartSchema = new Schema({
	price: Number,
	amount: Number,
	description: String,
	productNumber: { type: Number, required: true }
});

var InvoiceSchema = new Schema({
	payments: [ { type: PaymentSchema, required: true } ],
	spareParts: [ SparePartSchema ],
	workHours: { type: Number, default: 0 }
});

var Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
