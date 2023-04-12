import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import File from './components/File';
import Cell from './components/Cell';
import { Light, Dark } from './themes.js';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { theme: 0 };
	}

	render() {
		const themes = [ Light, Dark ];
		document.body.style.backgroundColor = themes[this.state.theme].background;
		return(
			<div>
				<File notebook="Demo Notebook" file={ WORKING_FILE } theme={themes[this.state.theme]} /> 
			</div>
		);
	}
}


/* RENDER PAGE
 *****************************************************************/

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <App />);

