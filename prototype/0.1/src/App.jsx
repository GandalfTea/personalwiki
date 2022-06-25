
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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cells: 1 }
	}

	add_cell() { 
		this.setState({ cells: this.state.cells + 1 });
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

root.render( <App /> );

