
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
	}

	render() {
		return(
			<div className="page">
				<PageHeader address="Algebra / Vectors / Vector Arithmatic" title="Vector Arithmetic" />
				<Cell />
				<Cell />
				<Cell />
				<div class="add-cell"> 
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

