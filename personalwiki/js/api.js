

/*
	Define functions to fetch the cells, files 
	or notebook fromthe local webserver API.		

	WARNING: For now, the data is stored in a 
				   very bad model that requires useless
					 computation.												*/
			

function fetch_cells(file) {
	fetch('/api/cells/').then(res => res.json()).then( (result) => {
		filter_cells(file, result)
	}, (err) => {
		handle_cell_fetch_failure(error);
	});
}

function filter_cells(file, cells) {
	for( let i=0; i < Object.keys(cells).length; i++ ) {
		if(cells[i].main_file != null && cells[i].main_file.name == file) {
			console.log(cells[i]);
		}
	}
}

function handle_cell_fetch_failure(error) {
	console.log("OOPSIE, there was a problem >.<");
}

export default fetch_cells;
