
import {v4 as uuid } from 'uuid';

/*
	Define functions to fetch the cells, files 
	or notebook fromthe local webserver API.		

	WARNING: For now, the data is stored in a 
				   very bad model that requires useless
					 computation.												*/
			

async function fetch_cells(file) {
	/*
	fetch('/api/cells/').then(res => res.json()).then( (result) => {
		return filter_cells(file, result);
	}, (err) => {
		handle_cell_fetch_failure(error);
	});
	*/

	// TODO: ERR func

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

async function post_cell_update(cell) {
	var xhr = new XMLHttpRequest();
	const new_id = uuid();
	xhr.open("PUT", "http://localhost:8000/api/cell/" + new_id , true);
	xhr.setRequestHeader("Content-Type", 'application/json');
	xhr.send(JSON.stringify(cell));
}

export { fetch_cells, post_cell_update };

