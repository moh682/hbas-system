const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { getAllCars } = require(__dirname + '/src/facade/dataFacade');

require('electron-reload')(__dirname);

// Connecting to the DB
const { TEST_URI } = require(__dirname + '/settings.js');
console.log(TEST_URI);
const { connect, mongoose } = require(__dirname + '/Connector.js');
connect(TEST_URI);
// connect.getConnection();

var currentWindow;
var winPopUp;
const template = [
	{
		label: 'hbas',
		submenu: [
			{
				label: 'table',
				click: () => {
					currentWindow.loadURL(
						url.format({
							pathname: path.join(__dirname, 'src/home.html'),
							protocol: 'file',
							slashes: true
						})
					);
				}
			},
			{
				role: 'quit',
				label: 'Luk'
			}
		]
	},
	{
		label: 'Søg',
		submenu: [
			{
				label: 'Bil Reg.',
				click: () => {
					winPopUp = new BrowserWindow({
						width: 250,
						height: 180,
						fullscreen: false,
						frame: false,
						webPreferences: {
							nodeIntegration: true,
							contextIsolation: false
						}
					});
					winPopUp.loadURL(`file://${__dirname}/src/searchBox.html`);
				}
			}
		]
	},
	{
		label: 'Kunde',
		submenu: [
			{
				label: 'Tilføj',
				click: () => {
					currentWindow.loadURL(`file://${__dirname}/src/addCust.html`);
					// console.log(typeof winPopUp);
					// if (typeof winPopUp === 'object') {
					// 	winPopUp.close();
					// }

					// winPopUp = new BrowserWindow({
					// 	frame: false,
					// 	fullscreen: false,
					// 	webPreferences: {
					// 		nodeIntegration: true,
					// 		contextIsolation: false
					// 	}
					// });

					// winPopUp.loadURL(
					// 	url.format({
					// 		pathname: path.join(__dirname, 'src/addCust.html'),
					// 		protocol: 'file',
					// 		slashes: true
					// 	})
					// );
				}
			},
			{
				label: 'Slet',
				role: 'Slet'
			},
			{
				label: 'Information',
				role: 'Information'
			}
		]
	}
];

app.on('ready', function() {
	currentWindow = new BrowserWindow({
		fullscreen: true,
		backgroundColor: '#9b9b9b',
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true
		}
	});

	currentWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'src/home.html'),
			protocol: 'file',
			slashes: true
		})
	);

	currentWindow.webContents.openDevTools();

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
});

/* ipcMain */
ipcMain.on('btn-home', (event, arg) => {
	console.log(event, arg);
});

ipcMain.on('getAllCars-call', async (event, arg) => {
	var cars = await getAllCars();
	event.reply('getAllCars-reply', cars);
});

ipcMain.on('addcarbtn-call', async (event, arg) => {
	currentWindow.loadURL(`file://${__dirname}/src/addCust.html`);
});

// works -- Closes the popup
ipcMain.on('search-box-close', (event, arg) => {
	winPopUp.close();
});
