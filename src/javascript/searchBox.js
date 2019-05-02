const { ipcRenderer } = require('electron');

document.getElementById('search-close-btn').addEventListener('click', () => {
	console.log('inside the function');
	ipcRenderer.sendSync('search-box-close', undefined);
});
