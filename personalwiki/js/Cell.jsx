

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
		this.b_update_from_fetch = false;
		this.cell_text = React.createRef();
	}

	componentDidUpdate() {
		if(this.state.focused) this.cell_text.current.focus();

		if( !this.b_update_from_fetch && this.props.data != null && this.props.data != "") {
			this.setState({data: this.props.data});
			this.b_update_from_fetch = true;
		}
	}

	render() {
		if(this.state.focused) {

			// Cell is focused.
			// On blur, copy the text to state to render
			return(
				<div className={ (this.state.data=="") ? 'cell cell-input cell-selected cell-empty' : 'cell cell-input cell-selected'} 
						 contentEditable tabIndex='0' ref={this.cell_text} 
						 data-id={ this.id }
						 onBlur={ () => {
								this.setState({focused: false})

								// TODO: This does not store empty lines.
								this.setState({ data: this.cell_text.current.innerText.replaceAll('\n', '\n\n')});

								// Update ledger on File parent class
								this.props.update_callback(this.id, this.cell_text.current.innerText.replaceAll('\n', '\n\n'));

								this.cell_text.current.innerText = "";

							}}>
				{this.state.data.replaceAll('\n\n', '\r\n')}</div>
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
