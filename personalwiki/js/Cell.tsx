
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import * as Core from './include';
import MarkdownRender from './MarkdownRender';

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

	componentDidUpdate() { 
		if(this.state.editing) this.cell_text.current.focus(); 
		if( this.state.focused && this.props.yield_focus() ) this.setState({ focused: false });
		console.log(`YIELDING: ${this.props.yield_focus()} : ${this.state.focused}`)
	}

	componentDidMount() {
		if(this.props.data != null && !this.b_update_from_fetch) {
			this.setState({data: this.props.data});
			this.b_update_from_fetch = true;
		}
	}

	render() {
		if(this.state.editing) {

			// INPUT MODE
			return(
				<div className={ `cell cell-input ${(this.state.data==='') ? 'cell-empty' : '' }` }
             contentEditable
						 tabIndex={0}
						 ref={this.cell_text}
						 onBlur={ () => {
             	this.setState({focused: false, editing: false, data: this.cell_text.current.innerText.replaceAll('\n', '\n\n')});
							this.props.alert_action( Core.cell_data_methods.CELL_PATCH, this.props.id );	// Send PATCH signal to parent object
							this.cell_text.current.innerText = '';
						 }}>
					{this.state.data.replaceAll('\n\n', '\r\n')}
				</div>
			)
		} else {

			// VIEW MODE
			return(
				<div className='cell-wrapper'>
					{ console.log(`CELL ${this.props.id} :  ${this.props.yield_focus()}`)}
					<div className={ `cell ${ this.state.focused ? 'cell-selected' : '' } ${ (this.state.data==='') ? 'cell-empty' : ''}`}
               data-id={this.props.id}
							 onClick={ this.state.focused ? () => this.setState({ editing: true}) 
							                              : () => { this.setState({ focused: true}); 
							                                        this.props.alert_action( Core.cell_ui_methods.CELL_SELECTED, this.props.id ); }}>
						<MarkdownRender children={this.state.data}></MarkdownRender>
					</div>
					<div className='cell-selected-options'>
						<button type='button' onClick={ () => console.log('UP')}><img src={IMG_ARROW} alt='move cell up' /></button>
						<button type='button' onClick={ () => console.log('DOWN')}><img src={IMG_ARROW} alt='move cell down' /></button>
						<button type='button' onClick={ () => console.log('DEL')}><img src={IMG_TRASH} alt='delete cell' /></button>
					</div>
				</div>
			)
		}
	}
}

export default Cell;
