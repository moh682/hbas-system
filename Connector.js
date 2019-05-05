const mongoose = require('mongoose');
const colors = require('colors');

async function connect(URI) {
	/* Gets the DB Collection name */
	return (mongoDB = await mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true }));
}

mongoose.connection.on('open', (err) => {
	if (err) console.log(colors.red(err));
	console.log(colors.green('Connection has been established'));
});

mongoose.connection.on('error', (err) => {
	if (err) console.log(colors.red(err));
	console.log(colors.bgRed('Mongoose Event Err has been emitted'));
});

mongoose.connection.on('close', (err) => {
	if (err) console.log(colors.red(err)), console.log(colors.blue('Connction has been closed'));
});

module.exports = {
	connect
};
