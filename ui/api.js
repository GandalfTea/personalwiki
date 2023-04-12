
import {v4 as uuid } from 'uuid';
import sha1 from 'sha1';

/*
	Define functions to fetch the cells, files 
	or notebook from the local webserver API.		

	WARNING: For now, the data is stored in a 
				   very bad model that requires useless
					 computation.												*/
			

function fetch_cells(notebook, file) {
	return new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();
		var url = 'http://localhost:8000/api/file/' + WORKING_FILE + '/cells';

		req.open('POST', url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.onreadystatechange = () => {
			if( req.readyState === 4 ) {
				var json = JSON.parse(req.responseText);
				resolve(json);
			}
		};

		req.send();
	});
}


function handle_cell_fetch_failure(error) {
	console.log("OOPSIE, there was a problem >.<");
}

async function post_cell_update(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	var payload = { "data": data, "parent_url": WORKING_FILE, "hash":sha1(data) };
	xhr.send(JSON.stringify(payload));
}

async function delete_cell(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	xhr.send()
}

async function patch_cell(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("PATCH", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	var payload = { "data": data, "parent_url": WORKING_FILE, "hash":sha1(data) };
	xhr.send(JSON.stringify(payload));
}

export { fetch_cells, post_cell_update, delete_cell, patch_cell };

