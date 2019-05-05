const mongoose = require('mongoose');

var fs = require('fs');
const url = require('url');
const path = require('path');
const colors = require('colors');

/* Models */
const Car = require(__dirname + '/../db/models/Car.js');
const Invoice = require(__dirname + '/../db/models/Invoice');
const User = require(__dirname + '/../db/models/User');

const addCar = async function(reg, brand, model, year) {
	await Car.deleteMany({}, (err) => {});
	var car = new Car({
		reg: reg,
		brand: brand,
		model: model,
		year: year
	});
	car.save();
};

const getAllCars = async function() {
	return await Car.find({}, function(err, cars) {
		return cars;
	});
};

// var date = new Date();

// const DATAPATH = url.format({
// 	pathname: path.join(__dirname + '/../db/data.json'),
// 	file: 'file'
// });

// function getLocalData() {
// 	return new Promise((resolve, reject) => {
// 		fs.readFile(DATAPATH, 'utf8', function(err, data) {
// 			if (err) reject(err);
// 			resolve(JSON.parse(data));
// 		});
// 	});
// }

// function InvoiceToData(data) {
// 	console.log('InvoiceToData', data);
// 	fs.writeFile(DATAPATH, data, { encoding: 'utf8' }, (err) => console.log(colors.red(err)));
// }

// async function addInvoice(carReg, price, payMethod, workingHours, spareParts) {
// 	var car = await getCar(carReg);
// 	console.log(spareParts);
// 	var invoice = {
// 		id: Date.now() + Math.floor(Math.random()),
// 		payment: {
// 			method: payMethod,
// 			date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
// 			price: price
// 		},
// 		workHours: workingHours,
// 		spareParts: spareParts
// 	};
// 	if (car !== null) {
// 		car.kvitteringer.push(invoice);
// 	}
// }

module.exports = {
	addCar,
	getAllCars
};
