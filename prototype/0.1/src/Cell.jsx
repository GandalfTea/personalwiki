

// Markdown Cell
// Instanciated inside of the File object
// TODO: This class should deal with the text formatting UI


import React from 'react';
import ReactMarkdown from 'react-markdown';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.id;
		this.state = { focused: false, data: "" };
		this.cell_text = React.createRef();
		this._data = "";
	}

	componentDidUpdate() {
		if(this.state.focused) this.cell_text.current.focus();
	}

	render() {
		if(this.state.focused) {

			// Cell is focused.
			// On blur, copy the text to state to render
			return(
				<div className={ (this.state.data=="") ? 'cell cell-selected cell-empty' : 'cell cell-selected'} 
						 contentEditable tabIndex='0' ref={this.cell_text} 
						 data-id={ this.id }
						 onBlur={ () => {
										this.setState({focused: false})

										// TODO: This does not store empty lines.
										this.setState({ data: this.cell_text.current.innerText});
										this._data = JSON.stringify(this.cell_text.current.innerText);
										this.cell_text.current.innerText = "";

										// Update ledger on File parent class
										this.props.update_callback(this.id, this._data);
							}}>
				{this.state.data}</div>
			)
		} else {
			return(
				<div className={ (this.props.selected !== "") ? (this.state.data=="") ? 'cell ' + this.props.selected + ' cell-empty'
																																			 : 'cell ' + this.props.selected 
																							 : (this.state.data=="") ? 'cell cell-empty' : 'cell' } 
						 data-id={ this.id }
						 onClick={   (this.props.selected !== "") ? () => this.setState({focused: true}) 
										 			  									 : () => { this.setState({selected: true}); 
																											   this.props.alert_selected(this.id) }}> 
						<ReactMarkdown>{this.state.data}</ReactMarkdown> 
				</div>
			)
		}
	}
}

export default Cell;
