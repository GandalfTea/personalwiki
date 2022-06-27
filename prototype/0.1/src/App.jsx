
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
		for( var i=0; i < INITIAL_CELLS; i++) this.ledger[i] = "";
		this.update_ledger = this.update_ledger.bind(this);

		// Select and Modify Cells
		this.selected = {};
		for( var i=0; i < INITIAL_CELLS; i++) this.selected[i] = false;
		this.alert_selected = this.alert_selected.bind(this);
		const unselect_callback = this.watch_unselect.bind(this); // for event listener
	}


	/* CELL SELECTION
	 ********************************************************************/

	watch_unselect() {
		// Unselect if the user clicks on anything other than an unselected cell 
		window.addEventListener('click', this.unselect_callback, false);
	}


	remove_unselected_watch() {
		window.removeEventListener('click', this.unselect_callback, false);
	}


	watch_func(e) {
		e.stopPropagation();
		console.log("ACTION: CLICKED ", e.target.className);

		const name = e.target.className.split(' ');
		if(name[0] == 'cell') {
			if( this.cell_is_active(e.target.dataset.id)) {
				this.deselect_all_cells();
			} else {
				this.select_cell( e.target.dataset.id );
			}
		}
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


	// Debug
	componentDidUpdate() {
		console.log("RENDER", this.state.selected);
		console.log(this.selected);
	}
	

	// FUNCTIONS PASSED DOWN TO CELL CHILD COMPONENTS

	update_ledger( idx, data ) {
		this.ledger[idx] = data;
	}

	alert_selected(idx) {
		this.setState({ selected: true });
		console.log("CAUGHT ALERT FOR:", idx);
		this.selected[idx] = true;
	}

	// Helpers

	add_cell() { 
		this.setState({ cells: this.state.cells + 1 });
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
				{ (this.state.selected) ? console.log("SELECTED") : "NOT SELECTED"}
			</div>
		);
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

