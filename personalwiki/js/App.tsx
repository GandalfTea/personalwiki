
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Cell from './Cell';
import PageHeader from './PageHeader.jsx';

import * as Core from './include';
import { Queue, Stack } from './DataStructures';
import { fetch_cells, post_cell_update, delete_cell } from './api.js';

import { v4 as uuid } from 'uuid';


/*	GLOBAL VARIABLES	*/

const WORKING_NOTEBOOK: string = "Demo Notebook";
const WORKING_FILE: string = "Demo File Title";
const STATIC_URL: string = "../wikiapp/static/";
const AUTOSAVE: number = 5000; // 5 seconds 

class File extends React.Component {
	queue: any;
	undo_stack: any;
	cycles: number;
	b_watching: boolean;
	cells: Array<any>;
	state: any;
	selected: any;

	constructor(props) {
		super(props);
		
		// Use a Queue to store pending changes to the backend
		this.queue = new Queue<Core.CellUpdate>();

		// After completing the changes in the Queue
		// Store the changes in a stack ready for an Undo
		this.undo_stack = new Stack<Core.CellUpdate>();

		// Keep track of how many times the object re-reders.
		// Some processes do not run on initial render.
		this.cycles = 0;

		// Track whether the File management system is 
		// watching for clicks to unselect cells
		this.b_watching = false;

		// Hold all Cell objects ready for render
		// TODO: Maybe find a way to not store all data?
		this.cells = [];

		// Initial number of cells.
		// Will be overwritten from the backend data
		this.state = { cells: 2, selected: false };

		// Store selected cells for multiple cell manipulation
		this.selected = {};
		for( var i = 0; i < this.state.cells; i++) this.selected[i] = false;

		// Render the initial number of cells, if DB is empty,
		// leave them to edit, overwrite with DB if not
		for(var i = 0; i < this.state.cells; i++) this.cells.push(<Cell alert_action={this._cell_alert_action} id={i} key={i} />);

		this.add_cell = this.add_cell.bind(this);
		this._cell_alert_action = this._cell_alert_action.bind(this);
	}


	/* BACKEND API
	 * ******************************************************/

	componentDidMount() {
		try {
			fetch_cells(WORKING_NOTEBOOK, WORKING_FILE).then( res=> {
				if(Object.keys(res).length > 0) {
					this.cells = [];
					for( const cell in res ) {
						this.cells.push( <Cell key={this.state.cells} id={this.state.cells}
		                               alert_action={this._cell_alert_action} 
													   />);
					}
					this.setState({ cells: Object.keys(res).length });
				}
			})
		} catch(error) {
			throw Error(error);
		}

		// Autosave Loop 
		setInterval( () => {
			if(this.queue.size() > 0) {
				for(var i = 0; i <= this.queue.size(); i++) {
					const request: Core.CellUpdate = this.queue.dequeue();	
					if( typeof(request) !== undefined ) {
						this._push_data(request);
					}
				}
			}
		}, AUTOSAVE)
	}

	_push_data = async (data: Core.CellUpdate) => {
		switch(data.method) {
			case Core.cell_data_method.POST:
				break;
			case Core.cell_data_method.DELETE:
				break;
			case Core.cell_data_method.PATCH:
				break;
			default:
		}
	}


	/* CELL SELECTION 
	 * *****************************************************/

	start_unselect_watch() {
		if( !this.b_watching ) {
			window.addEventListener('click', this._cell_unselect_watch, false);
			this.b_watching = true;
		}
	}

	stop_unselect_watch() {
		if( this.b_watching ) {
			window.removeEventListener('click', this._cell_unselect_watch, false);
			this.b_watching = false;
		}
	}

	_cell_unselect_watch(e: any) {
		e.stopPropagation();
		e.preventDefault();

		// Note: Should it stay selected when you add another cell?
		if( e.target.className == 'add-cell-button') return; 
		else if ( this.cycles > 1 ) {

			// select_cell here only handles the File object selection,
			// the click itself handles the internall Cell selection
			(e.target.className.split(' ')[0] === 'cell') ? this._select_cell(e.target.dataset.id) 
			                                              : this._deselect_all_cells();
		}
	}

	_deselect_all_cells() {
		for(var i = 0; i <= this.state.cells; i++) {
			this.selected[i] = false;
		}
	}



	/* CELL MANAGEMENT 
	 * ****************************************************/

	// Callback given as prop to Cell objects
	_cell_alert_action( method: Core.cell_ui_methods, id: string ) {
		switch(method) {
			case Core.cell_ui_methods.CELL_SELECTED:

				// TODO: This should not be a state change
				console.log(this.setState);
				this.setState({ selected: true});
				this.selected[id] = true;
				break;

			case Core.cell_ui_methods.CELL_EDIT:
				// Create CellUpdate and push to Queue
				break;

			case Core.cell_ui_methods.CELL_DELETE:
				// Create CellUpdate and push to Queue
				// remove from this.cells
				//this.setState({ cells: --this.state.cells });
				break;

			case Core.cell_ui_methods.CELL_MOVE_UP:
				break;
			case Core.cell_ui_methods.CELL_MOVE_DOWN:
				break;
			default:
				throw Error("Unknown method in '_cell_alert_action': ${method}");
		}
	}

	add_cell() {
		this.cells.push(<Cell key={this.state.cells} id={this.state.cells}
		                      alert_action={this._cell_alert_action} 
													/>);
		// This is stupid, but cells don't render without a new memory reference
		this.cells = [...this.cells];
		this.setState({ cells: ++this.state.cells });
		this.selected[Object.keys(this.selected).length+1] = false;
	}


	/* HELPERS
	 * ******************************************************/

	_get_date() {
		var date: any = new Date();
		var new_date: string =  date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes();
		return new_date;
	}

	_select_cell( id: number ) {
		this.selected[id] = true;
	}

	componentDidUpdate() {
		this.cycles++;
	}

	/* RENDER
	 * ******************************************************/


	render() {

		return(
			<div className="page">
				<>
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title={WORKING_FILE} />

				{this.cells}

				<p className="last-edit">{"Last Update: " + this._get_date().replaceAll('/', '.').replace('@', ' at ')}</p>
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<img src="" alt="" />
				</div>
				{ (this.b_watching) ? this.start_unselect_watch() : this.stop_unselect_watch() }
				</>

			</div>
		)
	}
}


/* RENDER PAGE
 *****************************************************************/

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

