
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
		this.state = { cells: 1 }
	}

	add_cell() { 
		this.setState({ cells: this.state.cells + 1 });
		this.save();
	}

				
	// Write to disk
	save() {

		var cells = document.getElementsByClassName('cell');
		var date = new Date();
		var bits = {
			"cells": [],
			"date": date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
							+ '@' + date.getHours() + ':' + date.getMinutes()
		}

		for( var i = 0; i < cells.length; i++ ) {
			var cell = {
				data: cells[i].innerText,
				metadata: {
					type: "Markdown"
				}
			}

			bits['cells'][i] = cell;
		}
		var json = JSON.stringify(bits);

	}

	render() {

		var cells = [];
		for( let i=0; i<this.state.cells; i++) {
			cells.push( <Cell key={i}/> );
		}

		return(
			<div className="page">
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title="Vector Arithmetic" />
				{cells}
				<div className="add-cell-button" onClick={ () => this.add_cell()} > 
					<img src="" alt="" />
				</div>
				<p class="last-edit">Last Update: 2 March 2022</p>
			</div>
		)
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File /> );

