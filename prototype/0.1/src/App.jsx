
import React from 'react';
import ReactDOM from 'react-dom/client';
import Cell from './Cell.jsx';

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

		this.state = { cells: INITIAL_CELLS, selected: false }

		// store all the cell's data for dump to disk
		this.ledger = {};
		for( var i=0; i <= INITIAL_CELLS; i++) this.ledger[i] = "";
		this.update_ledger = this.update_ledger.bind(this);

		// Select and Modify Cells
		this.selected = {};
		for( var i=0; i <= INITIAL_CELLS; i++) this.selected[i] = false;
		this.alert_selected = this.alert_selected.bind(this);
		this.watch_func = this.watch_func.bind(this);
		this.b_watch = false;
		this.b_initial_skip = true;
	}


	/* CELL SELECTION
	 ********************************************************************/

	watch_unselect() {
		// Unselect if the user clicks on anything other than an unselected cell 
		if( !this.b_watch ) {
			console.log("ADD Click Watchdog");
			window.addEventListener('click', this.watch_func, false);
			this.b_watch = true;
		} else {
			console.log("Alert : Watchdog already exists");
		}
	}


	remove_unselected_watch() {
		if( this.b_watch) {
			console.log("REMOVE Click Watchdog");
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
		console.log("ACTION: Clicked ", e.target.className);

		if( !this.b_initial_skip ) {
			const name = e.target.className.split(' ');
			console.log(this.selected);
			if(name[0] == 'cell') {
				console.log(e.target.dataset.id);
				this.select_cell( e.target.dataset.id );
			} else {

				// Miss, no selection
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

	cell_is_active( cell ) {
		return this.selected[cell];
	}

	select_cell( cell ) {
		this.selected[cell] = true;
	}


	// FUNCTIONS PASSED DOWN TO CELL CHILD COMPONENTS

	update_ledger( idx, data ) {
		this.ledger[idx] = data;
	}

	alert_selected(idx) {
		this.setState({ selected: true });
		this.selected[idx] = true;
	}

	// Helpers

	add_cell() { 
		this.setState({ cells: ++this.state.cells });
		this.selected [this.state.cells-1 ] = false;
		this.save();
	}

				
	// Write to disk
	save() {

		var date = new Date();
		var bits = {
			"cells": [],
			"date": date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
							+ '@' + date.getHours() + ':' + date.getMinutes()
		}

		for( var i = 0; i < Object.keys(this.ledger).length; i++ ) {
			var cell = {
				data: this.ledger[i],
				metadata: {
					type: "markdown"
				}
			}
			bits['cells'][i] = cell;
		}

		var json = JSON.stringify(bits);
		//console.log(bits);
	}

	render() {
		var cells = [];
		for( let i=0; i<this.state.cells; i++) {
			cells.push( <Cell key={i} id={i} 
												update_callback={this.update_ledger} 
												alert_selected={this.alert_selected} 
											  selected={ (this.selected[i]) ? "cell-selected " : "" }/> );
		}

		return(
			<div className="page">
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title="Vector Arithmetic" />
				<p class="last-edit">Last Update: 2 March 2022</p>
				{cells}
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<img src="" alt="" />
				</div>
				{ (this.state.selected) ? this.watch_unselect() : this.remove_unselected_watch() }
			</div>
		);
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

