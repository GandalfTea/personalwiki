

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



/*	Get Data From Server */

async function fetch_notebooks() {
	fetch('/api/notebooks/').then(res => res.json()).then( (result) => {
		for( let i = 0; i < result.length; i++) {
			console.log(result[i]['title']);
		}
	}
}

async function fetch_files_of_notebook( notebook: string) {
	var payload = { "name": notebook };
	var req = new XMLHttpRequest();
	req.open("POST", "http://localhost:8000/api/notebook/files");
	req.setRequestHeader("Content-Type", 'application/json');
	req.send(JSON.stringify(payload));
	req.onreadystatechange = () => {
		if( req.readyState == 4 && req.status == 200) {
			console.log(req.responseText);
		}
	}
}

async function fetch_tree() {
	const notebooks = fetch_notebooks();
	for( i of notebooks) {
		fetch_files_of_notebook(i);
	}
}

fetch_tree();


