const { ipcRenderer } = require('electron');

var table = document.getElementById('table-output');
var loader = document.getElementById('loader');
var reloadBtn = document.getElementById('reload-btn');
var addCarBtn = document.getElementById('add-car');

reloadBtn.addEventListener('click', () => start());
addCarBtn.addEventListener('click', () => {
	ipcRenderer.send('addcarbtn-call');
});

reloadBtn.style.display = 'none';
addCarBtn.style.display = 'none';

function start() {
	loader;
	ipcRenderer.send('getAllCars-call');
}
start();

ipcRenderer.on('getAllCars-reply', function(event, arg) {
	table.innerHTML = createTable(arg);
	reloadBtn.style.display = 'flex';
	addCarBtn.style.display = 'flex';
	loader.style.display = 'none';
});

function createTable(data) {
	// creates header
	var theader = createTableHeader([ 'reg', 'brand', 'model', 'year', 'users', 'invoices' ]);
	// creates body
	var tbody = data.map((object, index) => {
		let { reg, brand, model, year, users, invoices } = object._doc;
		invoices = invoices.length === 0 ? 'Ingen Data' : invoices;
		users = users.length === 0 ? 'Ingen Data' : users;

		return `<tr key=${index}><th>${index}</th><td>${reg}</td><td>${brand}</td><td>${model}</td><td>${year}</td><td>${users}</td><td>${invoices}</td></tr>`;
	});
	tbody.unshift('<tbody>');
	tbody.push('</tbody>');
	tbody = tbody.join('');

	// sets theader and tbody together
	var res = `<table class="table">${theader}${tbody}</table>`;
	return res;
}

function createTableHeader(headers) {
	var theader = headers.map((header) => {
		return `<th> ${header} </th>`;
	});
	theader.join('');
	theader.unshift('<thead class="thead-dark"><tr><th>#</th>');
	theader.push('</tr></thead>');
	theader = theader.join('');
	return theader;
}
