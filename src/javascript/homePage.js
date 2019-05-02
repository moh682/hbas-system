const { getData } = require(__dirname + '/../facade/dataFacade');

var table = document.getElementById('table-output');
var loader = document.getElementById('loader');
var btn = document.getElementById('reload-btn');
btn.style.display = 'none';

(() => {
	setTimeout(async () => {
		loader.style.display = 'none';
		var data = await getData().then(data);
		table.innerHTML = createTable(data);
		btn.style.display = 'flex';
	}, 1500);
})();

function createTable(data) {
	// manipulate data
	var dataArr = data.data;

	// creates header
	var theader = createTableHeader(data.headers);

	// creates body
	var tbody = dataArr.map((user, index) => {
		return `<tr key=${index}><td>${index}</td><td>${user.bil}</td><td>${user.name}</td><td>${user.invoices}</td></tr>`;
	});
	tbody.unshift('<tbody>');
	tbody.push('</tbody>');
	tbody = tbody.join('');

	// sets theader and tbody together
	var res = `<table>${theader}${tbody}</table>`;
	return res;
}

function createTableHeader(headers) {
	var theader = headers.map((header) => {
		return `<th> ${header} </th>`;
	});
	theader.join('');
	theader.unshift('<thead><tr><th>#</th>');
	theader.push('</tr></thead>');
	theader = theader.join('');
	return theader;
}
