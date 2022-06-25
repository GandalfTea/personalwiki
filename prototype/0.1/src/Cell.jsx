

// Markdown Cell
// Bundled inside of the File object


import React from 'react';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { focused: false };
	}

	render() {
		return(
			<div className='cell'>
				<textarea></textarea>
			</div>
		)
	}
}

export default Cell;
