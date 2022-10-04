

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



/*	Get Data From Server and Construct UI */

function fetch_files_of_notebook( notebook: string ) {
	return new Promise(function (resolve, reject) {
		//console.log(notebook);
		var payload = { "name": notebook };
		var req = new XMLHttpRequest();
		req.open("POST", "http://localhost:8000/api/notebook/files", true);
		req.setRequestHeader("Content-Type", 'application/json');
		req.send(JSON.stringify(payload));
		req.onreadystatechange = () => {
			if( req.readyState == 4 && req.status == 200) {
				console.log(req.responseText);
				resolve(req.responseText);
			}
		}
	});
}



(async () => {

	var UI = [];

 	await fetch('/api/notebooks/').then(res => res.json()).then( async (result) => {
		for( let i = 0; i < result.length; i++) {
			let files = await fetch_files_of_notebook(result[i]['title']);
			let files_ui = [];
			for( let j of JSON.parse(files) ) {
				files_ui.push( <FileEntry name={j['name']} />);	
			}
			UI.push( <NotebookEntry name={result[i]['title']} files={files_ui} />);
		}
	}


	const root = ReactDOM.createRoot(
		document.getElementById('root')
	);

	root.render(
		<div>
			{UI}
		</div>
	);

})()


