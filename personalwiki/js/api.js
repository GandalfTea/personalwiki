
import {v4 as uuid } from 'uuid';

/*
	Define functions to fetch the cells, files 
	or notebook fromthe local webserver API.		

	WARNING: For now, the data is stored in a 
				   very bad model that requires useless
					 computation.												*/
			

async function fetch_cells(notebook, file) {

	// TODO: ERR func
	
	/*
	var req = new HMLHttpRequest();
	req.open('GET', 'https://localhost:8000/api/file/cells', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(file));

	*/

	const res = await fetch('/api/cells/');
	const json = await res.json();
	//return filter_cells(file, json);
	return json;
}

function filter_cells(file, cells) {
	var data = [];
	for( let i=0; i < Object.keys(cells).length; i++ ) {
		if(cells[i].main_file != null && cells[i].main_file.name == file) {
			data.push(cells[i]);
		}
	}
	return data;
}

function handle_cell_fetch_failure(error) {
	console.log("OOPSIE, there was a problem >.<");
}

async function post_cell_update(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	xhr.send(JSON.stringify(data));
}

async function delete_cell(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	xhr.send(JSON.stringify(data));
}

async function patch_cell(uuid, data) {
	var xhr = new XMLHttpRequest();
	xhr.open("PATCH", "http://localhost:8000/api/cell/" + uuid , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	xhr.send(JSON.stringify(data));
}

export { fetch_cells, post_cell_update, delete_cell, patch_cell };

