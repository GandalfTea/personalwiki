

// Markdown Cell
// Bundled inside of the File object


import React from 'react';
import ReactMarkdown from 'react-markdown';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { focused: false, data: "" };
		this.cell_text = React.createRef();
	}

	render() {
		if(this.state.focused) {

			// Cell is focused.
			// On blur, copy the text to state to render
			return(
				<div className='cell cell-selected' contentEditable tabIndex='0' ref={this.cell_text} 
							onBlur={ () => {
										this.setState({focused: false})

										// TODO: This does not store empty lines.
										this.setState({ data: this.cell_text.current.innerText});
										this.cell_text.current.innerText = "";
							}}>
				{this.state.data}</div>
			)
		} else {
			return(
				<div className="cell" onClick={ () => this.setState({focused: true})}> 
						<ReactMarkdown>{this.state.data}</ReactMarkdown> 
				</div>
			)
		}
	}
}

export default Cell;
