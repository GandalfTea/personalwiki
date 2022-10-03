import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import File from './File';
import Cell from './Cell';



/* RENDER PAGE
 *****************************************************************/

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render( <File notebook="Demo Notebook" file="Basic Usage Tutorial and Demo"/> );

