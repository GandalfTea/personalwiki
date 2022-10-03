
export default File;
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Cell from './Cell';
import PageHeader from './PageHeader.jsx';

import * as Core from './include';
import { fetch_cells, post_cell_update, delete_cell, patch_cell } from './api.js';

import { v4 as uuid } from 'uuid';




class File extends React.Component {

	queue: CellUpdate[];
	undo_stack: CellUpdate[];
	cycles: number;
	b_watching: boolean;
	b_selected: boolean;
	b_yield_focus: boolean;
	cells: Array<any>;
	state: { cells: number };
	selected: boolean[];
	AUTOSAVE: number;

	constructor(props) {
		super(props);
		
		// Use a Queue to store pending changes to the backend
		this.queue = [];

		// After completing the changes in the Queue
		// Store the changes in a stack ready for an Undo
		this.undo_stack = [];

		// Keep track of how many times the object re-reders.
		// Some processes do not run on initial render.
		this.cycles = 0;

		// Track whether the File management system is 
		// watching for clicks to unselect cells
		this.b_watching = false;
	
		// Keep track of wether there are any selected cells
		this.b_selected = false

		// Request deselect from all cells
		this.b_yield_focus = false;

		// Hold all Cell objects ready for render
		this.cells = [];

		// Hardcoded for now
		this.AUTOSAVE = 1000 // 1 second

		// Initial number of cells.
		// Will be overwritten from the backend data
		this.state = { cells: 2 };

		// Store selected cells for multiple cell manipulation
		this.selected = {};
		for( var i = 0; i < this.state.cells; i++) this.selected[i] = false;

		// Render the initial number of cells, if DB is empty,
		for(var i = 0; i < this.state.cells; i++) this.cells.push(<Cell alert_action={this._cell_alert_action.bind(this)} 
		                                                                id={i} key={i} 
																																		uuid={ uuid() }
																																		/>);

		this.add_cell = this.add_cell.bind(this);
		this.move_cell = this.move_cell.bind(this);
		this._cell_unselect_watch = this._cell_unselect_watch.bind(this);
		this._push_data = this._push_data.bind(this);
	}


	/* BACKEND API
	 * ******************************************************/

	componentDidMount() {
		try {
			fetch_cells(this.props.notebook, this.props.file).then( res=> {
				if(Object.keys(res).length > 0) {
					this.cells = [];
					for( const cell in res ) {
						this.cells.push( <Cell key={parseInt(cell)+10} id={parseInt(cell)}
		                               alert_action={this._cell_alert_action.bind(this)} 
													         yield_focus={ this.alert_unselect_yield.bind(this) }
																	 data={ res[cell].data }
																	 uuid={ res[cell].uuid }
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
			if(this.queue.length > 0) {
				for(var i = 0; i <= this.queue.length; i++) {
					const request: Core.CellUpdate = this.queue.shift();	
					if( typeof(request) !== undefined ) {
						this._push_data(request);
					}
				}
			}
		}, this.AUTOSAVE)
	}

	_push_data = async (data: Core.CellUpdate) => {
		switch(data.method) {
			case Core.cell_data_methods.POST:
				if( data.data !== '') {
					console.log('%cPOST' + `%c ${data.uuid}:`, "color:#ff8359", "color:#7FB7BE");
					post_cell_update(data.uuid, data.data);
				}
				break;

			case Core.cell_data_methods.DELETE:
				console.log('%cDELETE' + `%c ${data.uuid}:`, "color:#ff8359", "color:#7FB7BE");
				await delete_cell(data.uuid, data.data);

				// Delete from DOM
				const idx: number = this.cells.findIndex( obj => { 
						return obj.props.id == parseInt(document.querySelector(`[data-uuid='${data.uuid}']`).dataset.id)
				});
				this.cells.splice(idx, 1)[0];
				this.cells = [...this.cells];
				this.setState({cells: this.state.cells})
				break;

			case Core.cell_data_methods.PATCH:
				console.log('%cPATCH' + `%c ${data.uuid}:`, "color:#ff8359", "color:#7FB7BE");
				patch_cell(data.uuid, data.data);
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
		else if ( this.cycles > 0 ) {

			// select_cell here only handles the File object selection,
			// the click itself handles the internall Cell selection
			(e.target.className.split(' ')[0] === 'cell') ? this._select_cell(e.target.dataset.id) 
			                                              : this._deselect_all_cells();
		}
	}

	// Alert Cells to Unselect when unselecting all
	alert_unselect_yield() {
		return this.b_yield_focus;
	}


	_deselect_all_cells() {
		for(var i = 0; i <= this.state.cells; i++) {
			this.selected[i] = false;
		}
		this.b_yield_focus = true;
		this.b_selected = false;
		this.cells = [...this.cells];
		this.setState({cells: this.state.cells});
	}



	/* CELL MANAGEMENT 
	 * ****************************************************/

	// Callback given as prop to Cell objects
	_cell_alert_action( method: Core.cell_ui_methods | Core.cell_data_methods, id: string, data?: string ) {

		switch(method) {
			case Core.cell_ui_methods.CELL_SELECTED:
				this.b_selected = true;
				this.selected[id] = true;
				this.setState({cells: this.state.cells});
				break;

			case Core.cell_ui_methods.CELL_MOVE_UP:
				this.move_cell(parseInt(id), parseInt(id)-1)
				//console.log(`ACTION: METHOD:${method} CELL: ${id} MOVING TO: ${parseInt(id)-1}`);
				break;
			case Core.cell_ui_methods.CELL_MOVE_DOWN:
				this.move_cell(parseInt(id), parseInt(id)+1)
				//console.log(`ACTION: METHOD:${method} CELL: ${id} MOVING TO: ${parseInt(id)+1}`);
				break;

			case Core.cell_data_methods.POST:
			case Core.cell_data_methods.DELETE:
			case Core.cell_data_methods.PATCH:

				console.log(`ACTION: METHOD:${method} CELL: ${id}`);
				const request: CellUpdate = {
					uuid: document.querySelector(`[data-id='${id}']`).dataset.uuid, 
					data: data,
					method: method,
				};
				this.queue.push(request);
				break;

			default:
				throw Error(`Unknown method in '_cell_alert_action': ${method}`);
		}
	}

	add_cell() {
		this.cells.push(<Cell key={this.state.cells} id={this.state.cells}
		                      alert_action={ this._cell_alert_action.bind(this)} 
													yield_focus={ this.alert_unselect_yield.bind(this) }
													uuid={ uuid() }
													/>);
		// This is stupid, but cells don't render without a new memory reference
		// TODO: This is taxing if cells scale
		this.cells = [...this.cells];
		this.setState({ cells: ++this.state.cells });
		this.selected[Object.keys(this.selected).length+1] = false;
	}

	move_cell( initPos: number , endPos: number ) {

		if(endPos < 0 || endPos > this.state.cells-1 || initPos === endPos) return;

		// Move in Array
		const cell: any = this.cells.splice(initPos, 1)[0];
		this.cells.splice(endPos, 0, cell);

		// Change Data Attribute 
		var new_cells = [];
		console.log(this.cells)
		for( let i: number = 0; i < this.cells.length; i++) {
			new_cells.push( React.cloneElement(this.cells[i], { 
				//key:i, 
				id:i,
				alert_action:this._cell_alert_action.bind(this),
				yield_focus:this.alert_unselect_yield.bind(this)
			}));
		}
		this.cells = [...new_cells];

		// TODO: Change boolean in selected array
		// NOTE: For now, any cell other than the moved one will be deselected
		// In the future, you should be able to move multiple cells at once
		for(let i: number = 0; i < this.selected.length; i++) this.selected[i] = false;
		this.selected[endPos] = true;
		// TODO: Figure out how to send deselect signal to individual cells or send select signal to one.

		this.setState({cells: this.state.cells});
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
		console.log(`REDRAW ${this.cycles}`)
		this.b_yield_focus=false;
	}



	/* RENDER
	 * ******************************************************/

	render() {
		return(
			<div className="page">
				<>
				{//console.log(this.b_yield_focus)}
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title={this.props.file} />

				{this.cells}

				<p className="last-edit">{"Last Update: " + this._get_date().replaceAll('/', '.').replace('@', ' at ')}</p>
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<p>&#x2B;</p>
				</div>

				{ (this.b_selected) ? this.start_unselect_watch() : this.stop_unselect_watch() }
				</>
			</div>
		)
	}
}

export default File;
