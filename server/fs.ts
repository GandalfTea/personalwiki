
import * from '@core';
const fs = require('fs');

enum diskerr {
	INVALID_ARGUMENTS,
	PARENT_NOTEBOOK_NOT_FOUND	
}

function write_to_file( cells: Cell[], file: string | null, notebook: string | null) : diskerr {

	const path = `../notebooks/${notebook.toLowerCase()}/${file.toLowerCase().pwf}`;
	if( file == null || notebook == null ) return diskerr.INVALID_ARGUMENTS;
	if( !fs.existsSync(path) ) return diskerr.PARENT_BOOK_NOT_FOUND;

	for(let cell of cells) {
		fs.appendFile(path, JSON.stringify({'uuid': cell.uuid, 'data': cell.data}), err => {
			if(err) console.log(err);
		})
	}	
} 
