
import * from '@core';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

export enum diskret {
	INVALID_ARGUMENTS,
	PARENT_NOTEBOOK_NOT_FOUND,
	FILE_NOT_FOUND,
	NOTEBOOK_ALREADY_EXISTS,
	OVERWRITE_FROM_SAFE_FUNCTION,
	FS_ERROR,	
	SUCCESS,
}


/* 
Flush a full FILE to disk in JSON format.

NOTE: If file does not exist, create it. If file does exist, overwrite.
@arg cells is a dict of cells with idx as keys.
*/

export function write_file( cells: Cell[], file: string, notebook: string) : diskret {
	if(file == null || notebook == null) return diskret.INVALID_ARGUMENTS;
	if(!fs.existsSync(path.resolve(__dirname, `../../notebooks/${notebook.toLowerCase()}`))) return diskret.PARENT_NOTEBOOK_NOT_FOUND;

	const rp = path.resolve(__dirname, `../../notebooks/${notebook.toLowerCase()}/${file.toLowerCase()}`);
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

	fs.writeFileSync(rp, JSON.stringify(data));
	return diskret.SUCCESS;
} 

/* 
Same as above, but does NOT overwrite existing files. */
export function write_file_safe( cells: Cell[], file: string, notebook: string) : diskret {
	if(fs.existsSync(path.resolve(__dirname, `../../notebooks/${notebook.toLowerCase()}/${file.toLowerCase()}`))) return diskret.OVERWRITE_FROM_SAFE_FUNCTION;
	else return write_file(cells, file, notebook)
}

export function remove_file(file: string, notebook: string) : diskret {
	const rp = path.resolve(__dirname, `../../notebooks/${notebook.toLowerCase()}/${file.toLowerCase()}`);
	if(fs.existsSync(rp)) {
		fs.unlinkSync(rp);
		if(fs.existsSync(rp)) return diskret.FS_ERROR;
		return diskret.SUCCESS;
	} else {
		return diskret.FILE_NOT_FOUND;
	}
}


export function create_nb(notebook: string): diskret {
	const rp = path.resolve(__dirname, `../../notebooks/${notebook.toLowerCase()}`);
	if(fs.existsSync(rp)) {
		return diskret.NOTEBOOK_ALREADY_EXISTS;
	} else {
		fs.mkdirSync(rp);
		if(fs.existsSync(rp)) {
			return diskret.SUCCESS;
		}
	}
}

