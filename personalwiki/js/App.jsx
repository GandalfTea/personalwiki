
import React from 'react';
import ReactDOM from 'react-dom/client';
import Cell from './Cell.jsx';
import { fetch_cells, post_cell_update, delete_cell } from './api.js';

import {v4 as uuid } from 'uuid';

/* Global Variables */

// Constant file for demo purposes.
const WORKING_FILE = "Demo File";
const STATIC_URL = "../wikiapp/static/";

// Only cache edited cells in working memory.
// This should hopefully reduce the load when working with big documents
const EDIT_CACHE = {}

// Time between autosaves
const AUTOSAVE = 10000;



/* Data Management  */


function save_data(notebook, file, cells) {
	// Save to db
	// Check database index integrity, if needed reorder items
}




/* UI  */

const PageHeader = (props) => {
	
	const addr = props.address.split(' / ');
	const address = addr.map( (a) => <a href="">{a} / </a> );

	return(
		<div className="page_header">
			<div>{address}</div>
			<h1>{props.title}</h1>
		</div>
	)
}


class File extends React.Component {
	constructor(props) {
		super(props);

		const INITIAL_CELLS = 2;
		const CELL_INDEX = INITIAL_CELLS;
		var EDITED = false;

		this.state = { cells: INITIAL_CELLS, selected: false, data_ready: false }
		this.b_initial_render = true;

		// Initial Data Fetch
		this.DB_DATA = {};

		// Select and Modify Cells
		this.selected = {};
		for( var i=0; i <= INITIAL_CELLS; i++) this.selected[i] = false;

		this.alert_selected = this.alert_selected.bind(this);
		this.watch_func = this.watch_func.bind(this);
		this.push_data = this.push_data.bind(this);
		this.cache_edit = this.cache_edit.bind(this);
		this.delete_cell_data = this.delete_cell_data.bind(this);

		this.b_watch = false; // watch for deselect clicks?
		this.b_initial_skip = true;
	}


	/* DATA MANAGEMENT 
	 ********************************************************************/


	fetch_data = async (notebook, file) => {
		return await fetch_cells(WORKING_FILE);
	}

	componentDidMount() {
		this.fetch_data("None", WORKING_FILE).then( res => { 
			this.DB_DATA=res
			this.setState({data_ready: true, cells: Object.keys(this.DB_DATA).length });
		});
	}

	push_data() {
		// Index is kil, we have to keep track of new ones and then push at end of list	
		for(let i=0; i < Object.Keys(this.DB_DATA).length; i++) {
			post_cell_update(DB_DATA[i]);
		}
	}

	delete_cell_data(idx) {
		delete_cell(this.DB_DATA[idx]);
		//this.EDIT_CACHE.splice(idx, 1);
		//this.setState({ cells: --this.state.cells});
	}


	/* CELL SELECTION
	 ********************************************************************/

	watch_unselect() {
		// Unselect if the user clicks on anything other than an unselected cell 
		if( !this.b_watch ) {
			window.addEventListener('click', this.watch_func, false);
			this.b_watch = true;
		} 
	}


	remove_unselected_watch() {
		if( this.b_watch) {
			window.removeEventListener('click', this.watch_func, false);
			this.b_watch = false;
			this.b_initial_skip = true;
		} else {
			this.b_initial_skip = true;
			return;
		}
	}


	watch_func(e) {
		e.stopPropagation();
		e.preventDefault();

		// Do not deselect when adding more cells
		if(e.target.className == 'add-cell-button') return;

		if( !this.b_initial_skip ) {
			const name = e.target.className.split(' ');
			if(name[0] == 'cell') {
				this.select_cell( e.target.dataset.id );
			} else {
				this.deselect_all_cells();
			}
		}
		this.b_initial_skip = false;
	}


	deselect_all_cells() {
		for( var i=0; i < Object.keys(this.selected).length; i++) {
			this.selected[i] = false;
		}
		this.setState({ selected: false });
	}


	select_cell( cell ) {
		this.selected[cell] = true;
	}



	/* FUNCTIONS PASSED DOWN TO CELL CHILD COMPONENTS
	 *****************************************************************/

	cache_edit( idx, data ) {
		EDIT_CACHE[idx] = {
			idx: idx,
			uuid: uuid(),
			data: data,
			uhash: "Demo Hash",
			//main_file: { name: "Demo File", notebook: { title: "Demo Notebook" } },
		}
		//this.push_data();
		post_cell_update(EDIT_CACHE[idx]);
	}

	alert_selected(idx, b_text_insert=false) {
		this.setState({ selected: true });
		this.selected[idx] = true;
		console.log(this.selected)
	}

	/* Helpers
	 **********/

	get_date() {
		var date = new Date();
		const new_date =  date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
						           + '@' + date.getHours() + ':' + date.getMinutes()
		return new_date;
	}


	/* CELL CONTROL AND DUMP TO DISK
	 *******************************************************************/

	add_cell() { 
		this.setState({ cells: ++this.state.cells });
		this.selected[this.state.cells-1 ] = false;
		//this.save();
	}

				
	// Write to disk
	// This is not used yet. We dump to the database.
	dump() {}



	/* RENDER
	 *********************************************************************/

	format_cells() {
		var cells = [];
		let idx = 0;

		// Render db data
		if(this.state.data_ready) {
			this.EDIT_CACHE = this.DB_DATA
			for(var i = 0; i <  Object.keys(this.EDIT_CACHE).length; i++) {
				cells.push( <Cell key={idx} id={idx} 
													update_callback={this.cache_edit} 
													alert_selected={this.alert_selected} 
													delete_callback={this.delete_cell_data}
													selected={ (this.selected[idx]) ? "cell-selected " : "" }
													data={this.EDIT_CACHE[i].data} /> );
				idx++;
			}	

			// Reset cell count 
			this.selected = {};
			this.b_initial_render = false;
			for( var i=0; i <= idx; i++) this.selected[i] = false;
		}

		if(idx==0) {
			for( let i=0; i<2; i++) {
				cells.push( <Cell key={idx} id={idx} 
													update_callback={this.cache_edit} 
													alert_selected={this.alert_selected} 
													delete_callback={this.delete_cell_data}
													selected={ (this.selected[idx]) ? "cell-selected " : "" }
													/> );
				idx++;
			}
		}
		for( var i=0; i < idx; i++) this.selected[i] = false;
		console.log(this.selected)
		console.log(cells)
		return cells;
	}

	render() {

		const cells = this.format_cells();

		return(
			<div className="page">
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title={WORKING_FILE} />
				{cells}
				<p className="last-edit">{"Last Update: " + this.get_date().replaceAll('/', '.').replace('@', ' at ')}</p>
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<img src="" alt="" />
				</div>
				{ (this.state.selected) ? this.watch_unselect() : this.remove_unselected_watch() }
			</div>
		);
	}
}


/* RENDER PAGE
 *****************************************************************/

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

