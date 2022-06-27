
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
	}


	// Watch for UNSELECT if any cell is selected.
	watch_unselect() {

		// Unselect IF: the user clicks on anything other than an unselected cell 
		var selected = this.selected;
		var b_set_selected_false = false;
		window.onclick = function(e) {
			const name = e.target.className.split(' ');
			if(name[0] == 'cell') {
				if( selected[ e.target.dataset.id] ) {
					// Deselect all cells
					for( var i=0; i < Object.keys(selected).length; i++) {
						console.log("ACTION : DESELECTING ALL")
						b_set_selected_false = true;
						selected[toString(i)] = false;
					}
				}
				selected[ toString(e.target.dataset.id) ] = true;
			}
		}
		if( b_set_selected_false) this.setState({ selected: false });
		this.selected = selected;
		console.log(this.selected);
	}
	

	// FUNCTIONS PASSED DOWN TO CELL CHILD COMPONENTS

	update_ledger( idx, data ) {
		this.ledger[idx] = data;
	}

	alert_selected(idx) {
		this.setState({ selected: true });
		console.log("CHANGING STATE TO TRUE FOR:", idx);
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
				{ (this.state.selected) ? this.watch_unselect() : null }
				{ (this.state.selected) ? console.log ("WATCHING FOR CLICKS") : null }
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title="Vector Arithmetic" />
				<p class="last-edit">Last Update: 2 March 2022</p>
				{cells}
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<img src="" alt="" />
				</div>
			</div>
		)
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

