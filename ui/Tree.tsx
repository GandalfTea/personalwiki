

import * from React as 'react';
import * from React-DOM as 'react-dom';

const NotebookEntry = function(props) {
	return(
		<div className="notebook_entry" >
			<a href=''> &#9660;     { props.name } </a>
			{ props.files }
		</div>
	);
}

const FileEntry = function(props) {
	return(
		<div className="file_entry">
			<a href={ props.url } >&#x2767;   { props.name } </a>
		</div>
	);
}


/*	Get Data From Disk and Construct UI */

(async () => {

	var UI = [];

	// Fetch files from server
 	/*await fetch('/api/notebooks/').then(res => res.json()).then( async (result) => {
		for( let i = 0; i < result.length; i++) {
			let files = await fetch_files_of_notebook(result[i]['title']);
			let files_ui = [];
			for( let j of JSON.parse(files) ) {
				files_ui.push( <FileEntry name={j['name']} url={'http://localhost:8000/editing/' + j['url'] } />);	
			}
			UI.push( <NotebookEntry name={result[i]['title']} files={files_ui} />);
		}
	} */
	await read_disk();

	const root = ReactDOM.createRoot(
		document.getElementById('root')
	);

	root.render(
		<div className="tree">
			{UI}
		</div>
	);

})()


