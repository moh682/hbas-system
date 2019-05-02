const mongoose = require('mongoose');
const colors = require('colors');

var db;

async function connect(URI) {
	/* Gets the DB Collection name */
	let arr = URI.split('/');
	let str = arr[arr.length - 1].split('?');
	db = str[0];

	return mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true });
}

mongoose.connection.on('open', (err) => {
	if (err) console.log(colors.red(err));
	console.log(colors.green('Connection has been established: ' + db));
});

mongoose.connection.on('error', (err) => {
	if (err) console.log(colors.red(err));
	console.log(colors.bgRed('Mongoose Event Err has been emitted: ' + db));
});

mongoose.connection.on('close', (err) => {
	if (err) console.log(colors.red(err)), console.log(colors.blue('Connction has been closed: ' + db));
});

module.exports = {
	connect,
	mongoose
};
