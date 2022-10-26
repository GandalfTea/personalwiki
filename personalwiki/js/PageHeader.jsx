
import React from 'react';
import ReactDOM from 'react-dom/client';

const PageHeader = (props) => {
	
	const addr = props.address.split(' / ');
	// TODO: asign key
	const address = addr.map( (a) => <a href="">{a} / </a> );

	return(
		<div className="page_header">
			<div style={{ color: props.theme.header_address}} >{address}</div>
			<h1 style={{ color: props.theme.header_title}} >{props.title}</h1>
		</div>
	)
};

export default PageHeader;
