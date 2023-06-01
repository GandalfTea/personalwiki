
import * from '@core';
const crypto = require('crypto');
const fs = require('fs');

enum diskret {
	INVALID_ARGUMENTS,
	PARENT_NOTEBOOK_NOT_FOUND,
	OVERWRITE_FROM_SAFE_FUNCTION,
	FS_ERROR,	
	SUCCESS,
}


/* 
Flush a full FILE to disk in JSON format.

NOTE: If file does not exist, create it. If file does exist, overwrite.
@arg cells is a dict of cells with idx as keys.
*/

function write_file( cells: Cell[], file: string, notebook: string) : diskret {
	if(file == null || notebook == null) return diskret.INVALID_ARGUMENTS;
	if(!fs.existsSync(`../notebook/${notebook.toLowerCase()}`)) return diskret.PARENT_NOTEBOOK_NOT_FOUND;

	const path = `../notebooks/${notebook.toLowerCase()}/${file.toLowerCase()}`;
	const date = new Date();
	var hashstring = crypto.createHash('sha1').update(JSON.stringify(cells)).digest('hex');

	var data = {
		"header" : [
			"file": file.toLowerCase(),
			"nb":   notebook.toLowerCase(),
			"length": cells.length,
			"hash": hashstring,
			"last_edit": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.toLocaleTimeString()}`,
		],
		"data": cells
	};

	const ws = fs.createWriteStream(path);
	ws.write(JSON.stringify(data));
	ws.close();
	return diskret.SUCCESS;
} 

/* 
Same as above, but does NOT overwrite existing files. */
function write_file_safe( cells: Cell[], file: string, notebook: string) : diskret {
	if(fs.existsSync(`../notebook/${notebook.toLowerCase()}/${file.toLowerCase()}`)) return diskret.OVERWRITE_FROM_SAFE_FUNCTION;
	else return write_file(cells, file, notebook)
}

// Would this ever be used?
function write_cell(cell: object, position: number,  file: string, notebook: string) {}
