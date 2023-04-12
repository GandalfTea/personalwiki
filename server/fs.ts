
import * from '@core';
import sha1 from 'sha1';
const fs = require('fs');

enum diskret {
	INVALID_ARGUMENTS,
	PARENT_NOTEBOOK_NOT_FOUND,
	FS_ERROR,	
	SUCCESSFUL
}


/* 
Flush a FILE object to disk in JSON format.

NOTE: If file does not exist, create it. If file does exist, overwrite.
RETURNS an instance of diskret.                                      */

function write_file( cells: Cell[], file: string | null, notebook: string | null) : diskret {
	if(file == null || notebook == null) return diskret.INVALID_ARGUMENTS;
	if(!fs.existsSync(`../notebook/${notebook.toLowerCase()}`)) return diskret.PARENT_NOTEBOOK_NOT_FOUND;

	const path = `../notebooks/${notebook.toLowerCase()}/${file.toLowerCase().pwf}`;
	const date = new Date();
	var hashstring = "";

	var data = {
		"metadata" : [
			"name": file.toLowerCase(),
			"nb":   notebook.toLowerCase(),
			"length": cells.length,
			"format": "json",
			"last_edit": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.toLocaleTimeString()}`,
		],
		"cells": []
	};

	for(let i=0; i <= cells.length; i++) {
		data["cells"][i] = cells[i];
		hashstring.concat(cells[i].data);
	}

	data["metadata"]["hash"] = sha1(hashstring); 

	fs.writeFile(path, JSON.stringify(data), err => {
		if(err) return diskret.FS_ERROR;
		return diskret.SUCCESSFUL;
	});
} 


/* 
Same as above, but does NOT overwrite existing files. */

function write_file_safe( cells: Cell[], file: string | null, notebook: string | null) : diskret {
}
