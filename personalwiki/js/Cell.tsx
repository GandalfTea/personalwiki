
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import * as Core from './include';

const STATIC_URL = "../wikiapp/static/";
const STATIC_IMG_ARROW = IMG_ARROW;
const STATIC_IMG_TRASH = IMG_TRASH;

class Cell extends React.Component {

	props: any;
	state: any;
	b_update_from_fetch: boolean;
	cell_text: any;
	
	constructor(props) {
		super(props);
		this.state = { focused: false, editing: false, data: "" };
		this.b_update_from_fetch = false;
		this.cell_text = React.createRef();
	}

	render() {
		if(this.state.editing) {

			// INPUT MODE
			return(
				<div className={ `cell cell-input cell-selected ${(this.state.data==='') ? 'cell-empty' : ''}` }
             contentEditable
						 tabIndex={0}
						 ref={this.cell_text}
						 onBlur={ () => {
             	this.setState({focused: false, data: this.cell_text.current.innerText.replaceAll('\n', '\n\n')});
							//this.alert_alert()	// Send PATCH signal to parent object
							this.cell_text.current.innerText = '';
						 }}>
					{this.state.data.replaceAll('\n\n', '\r\n')}
				</div>
			)
		} else {

			// VIEW MODE
			return(
				<div className='cell-wrapper'>
					<div className={ `cell ${(this.state.focused) ? 'cell-selected' + (this.state.data==='') ? ' cell-empty' : ''
																													: (this.state.data==='') ? 'cell-empty' : ''}` }
               data-id={this.props.id}
							 onClick={ this.state.focused ? () => { this.setState({editing: true}); 
							                                          this.props.alert_selected(this.props.id); }
							                                : () => this.setState({ focused: true})} >
						<ReactMarkdown>{this.state.data}</ReactMarkdown>
					</div>
					<div className='cell-selected-options'>
						<button type='button' onClick={console.log('UP')}><img src={IMG_ARROW} alt='move cell up' /></button>
						<button type='button' onClick={console.log('DOWN')}><img src={IMG_ARROW} alt='move cell down' /></button>
						<button type='button' onClick={console.log('DEL')}><img src={IMG_TRASH} alt='delete cell' /></button>
					</div>
				</div>
			)
		}
	}
}

export default Cell;
