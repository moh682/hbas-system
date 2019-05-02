/* Make Your Life Easier To Read console logs */
const colors = require('colors');

/* Test */
const mocha = require('mocha');
const { assert, expect } = require('chai');

/* Mongoose Connection */
const { connect, mongoose } = require(__dirname + '/../Connector.js');
const { TEST_URI } = require(__dirname + '/../settings');

/* Models */
var User = require(__dirname + '/../src/db/models/User');
var Car = require(__dirname + '/../src/db/models/Car');
var Invoice = require(__dirname + '/../src/db/models/Invoice');

/* Data */
const DummyData = require(__dirname + '/../src/db/data.json');
const testData = require(__dirname + '/dummyData.js');

describe(colors.bgGreen('Testing MongoDB Connection'), async function() {
	this.timeout('10s');

	before(function(done) {
		connect(TEST_URI);
		mongoose.connection.once('open', function(err) {
			if (err) console.log(err);
			done();
		});
	});

	after(function(done) {
		mongoose.disconnect(function(err) {
			console.log(colors.bgRed('\nConnection to test Database is closed'));
			done();
		});
	});

	beforeEach(async function(done) {
		done();
	});

	it('Should Add/find a Car', async function() {
		let reg = 'AS12212';
		var car = new Car({
			reg: reg,
			brand: 'something',
			model: 'somethin else',
			year: 2003
		});
		await car.save();
		var mongoCar = await Car.findOne({ reg: reg });
		expect(mongoCar).not.to.be.null;
		expect(mongoCar.reg).to.be.equal(reg);
	});
});
