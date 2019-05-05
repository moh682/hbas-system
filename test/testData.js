/* Make Your Life Easier To Read console logs */
const colors = require('colors');

/* Test */
const mocha = require('mocha');
const { assert, expect } = require('chai');

/* Mongoose Connection */
const { connect, mongoose } = require(__dirname + '/../Connector.js');
const { TEST_URI, PRODUCTION_URI } = require(__dirname + '/../settings');

/* Models */
var User = require(__dirname + '/../src/db/models/User');
var Car = require(__dirname + '/../src/db/models/Car');
var Invoice = require(__dirname + '/../src/db/models/Invoice');

/* dataFacade */
var { addCar, getAllFromModel, getOneFromModel, deleteAllData } = require(__dirname + '/../src/facade/dataFacade');

describe(colors.bgGreen('Testing MongoDB Connection'), async function() {
	this.timeout('10s');

	before(function(done) {
		connect(PRODUCTION_URI);
		mongoose.connection.once('open', async function(err) {
			if (err) console.log(err);
			/* When connection is open, Delete everything in the database */

			await deleteAllData();
			done();
		});
	});

	after(function(done) {
		mongoose.disconnect(function(err) {
			console.log(colors.bgRed('\nConnection to test Database is closed'));
			done();
		});
	});

	it('Should Add/find a Car', async function() {
		await Car.insertMany([
			{
				reg: 'AM12333',
				brand: 'Toyota',
				model: 'yaris',
				year: 2014
			},
			{
				reg: 'AS31133',
				brand: 'BMW',
				model: 'X5',
				year: 2013
			},
			{
				reg: 'SS98765',
				brand: 'Honda',
				model: 'Civic',
				year: 2017
			}
		]);
		let allCars = await getAllFromModel('Car');
		expect(allCars[0].brand).to.be.equal('Toyota');
		expect(allCars.length).to.be.equal(3);
	});

	it('Should find a Car and add User to it', async function() {
		let user = new User({
			name: 'mohammad',
			email: 'screenchok@gmail.com',
			address: 'random location',
			zip: 3000
		});
		await user.save();
		var filter = { reg: 'AM12333' };
		var car = await Car.findOneAndUpdate(filter, { $push: { users: user } }, { new: true });
		// var dbUser = await User.findOne({ email: 'screenchok@gmail.com' });
		var dbUser = await getOneFromModel('User', { email: 'screenchok@gmail.com' }); // Same as above
		expect(car.users).is.not.empty;
		expect(car.users[0].toString()).to.be.equal(dbUser.id);
	});

	it('Should find a Car and add an Invoice to it', async function() {
		let invoice = await new Invoice({
			payments: {
				method: 'Kort',
				price: 2000
			},
			spareParts: [
				{
					price: 200,
					amount: 3,
					description: 'Wheels',
					productNumber: 2231125682
				}
			],
			workingHours: 3
		});
		invoice.save();
		var car = await Car.findOneAndUpdate({ reg: 'AS31133' }, { $push: { invoices: invoice } }, { new: true });
		expect(car.invoices).not.to.be.empty;
		expect(car.invoices.length).to.be.equal(1);
	});
});
