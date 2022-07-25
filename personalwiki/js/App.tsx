
import React from 'react';
import ReactDOM from 'react-dom/client';
import Cell from './Cell.jsx';
import PageHeader from './PageHeader.jsx';
import { fetch_cells, post_cell_update, delete_cell } from './api.js';

import { v4 as uuid } from 'uuid';


/*	GLOBAL VARIABLES	*/

const WORKING_FILE : string = "Demo File Title";
const STATIC_URL : string = "../wikiapp/static/";
const AUTOSAVE : number = 600000; // 10 minutes

// Local Changes Cache
const EDIT_CACHE = [];

enum cell_update_methods {
	CELL_TEXT_EDIT,
	CELL_MOVE_UP,
	CELL_MOVE_DOWN,
	CELL_DELETE
};

class File extends React.Component {
	constructor(props) {
		super(props);
	}

	/* API MANAGEMENT
	 * ******************************************************/

	_fetch_data = async (notebook:string, file:string) => {
		return await fetch_cells(WORKING_FILE);
	}
	
	_push_data = async (notebook:string, file:string) => {
		// Push EDIT_CACHE to the backend
	}

	// NOTE: might not need to edit individual cells in storage
	_push_cell = async (method:string, cell) => {
		switch(method) {
			case "POST":
				break;
			case "DELETE":
				break;
			case "PATCH":
				break;
			default:
		}
	}


	// Cell Selection
	// Cell Management
	// Pass-downs
	// Render
}
