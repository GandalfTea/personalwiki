

import * from React as 'react';
import * from React-DOM as 'react-dom';


const NotebookEntry = function(props) {
	// TODO: Collapse
	return(
		<div>
			<a href=''>{ props.name } </a>
			{ props.files }
		</div>
	);
}

const FileEntry = function(props) {
	return(
		<div>
			<a href=''> { props.name } </a>
		</div>
	);
}


var notebooks = [];

fetch('/api/notebooks/').then(res => res.json()).then( (result) => {
	for( auto i : result ) {
		notebooks.push( <NotebookEntry name={i.title}  files={} />);	
	}
}, (err) => {
	console.log(error);
});
