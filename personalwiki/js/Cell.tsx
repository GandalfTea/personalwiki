
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import * as Core from './include';
import MarkdownRender from './MarkdownRender';

const STATIC_URL = "../wikiapp/static/";
const STATIC_IMG_ARROW = IMG_ARROW;
const STATIC_IMG_TRASH = IMG_TRASH;

class Cell extends React.Component {

	props: { key: number, id: number, alert_action: any, yield_focus: any, data: string, uuid: };
	state: { selected: boolean, editing: boolean, data: string};
	b_update_from_fetch: boolean;
	b_initial_post: boolean;
	cell_text: any;
	
	constructor(props) {
		super(props);
		this.state = { selected: false, editing: false, data: (this.props.data!=undefined && this.props.data!= '') ? this.props.data : "" };

		// Make initial request a POST and subsequent requests PATCH
		// If updated from fetch, make all requests PATCH
		this.b_initial_post = (this.props.data==undefined&&this.props.data=='') ? false : true;
		this.cell_text = React.createRef();
	}

	componentDidUpdate() { 
		if(this.state.editing) this.cell_text.current.focus(); 
		if( this.state.selected && this.props.yield_focus() ) this.setState({ focused: false });
		//console.log(`YIELDING: ${this.props.yield_focus()} : ${this.state.focused}`)
	}


	// Alert parent File class of incoming actions
	alert_parent( method: Core.cell_ui_methods | Core.cell_data_methods, id: string ) {
		this.props.alert_action(method, id);	
	}

	render() {
		if(this.state.editing) {

			// INPUT MODE
			return(
				<div className='cell-wrapper'>
					<div className={ `cell cell-input ${(this.state.data==='') ? 'cell-empty' : '' }` }
         	    contentEditable
							 tabIndex={0}
         	    data-id={this.props.id}
							 data-uuid={this.props.uuid}
							 ref={this.cell_text}
							 onBlur={ () => {
         	    	this.setState({selected: false, editing: false, data: this.cell_text.current.innerText.replaceAll('\n', '\n\n')});
								if(this.cell_text.current.innerText.replaceAll('\n', '\n\n') !== ''){
									this.props.alert_action( (this.b_initial_post) ? Core.cell_data_methods.POST
								 	                                               : Core.cell_data_methods.PATCH, 
																						this.props.id, this.cell_text.current.innerText.replaceAll('\n', '\n\n'));
									this.cell_text.current.innerText = '';
									if(this.b_initial_post) this.b_initial_post = false;
								}
							 }}>
						{this.state.data.replaceAll('\n\n', '\r\n')}
					</div>
					<p className='cell-id-prompt cell-id-prompt__input'> &#9664; [{ this.props.id + 1}]</p>
				</div>
			)
		} else {

			// VIEW MODE
			return(
				<div className='cell-wrapper'>
					{ /*console.log(`CELL ${this.props.id} :  ${this.props.yield_focus()}`)*/ }
					<div className={ `cell ${ this.state.selected ? 'cell-selected' : '' } ${ (this.state.data==='') ? 'cell-empty' : ''}`}
               data-id={this.props.id}
							 data-uuid={this.props.uuid}
							 onClick={ this.state.selected ? () => this.setState({ editing: true}) 
							                              : () => { this.setState({ selected: true}); 
							                                        this.props.alert_action( Core.cell_ui_methods.CELL_SELECTED, this.props.id ); }}>
						<MarkdownRender children={this.state.data}></MarkdownRender>
					</div>
					<div className='cell-selected-options'>
						<button type='button' onClick={ () => this.alert_parent( Core.cell_ui_methods.CELL_MOVE_UP, this.props.id)}>
							<p>&#9650;</p></button>
						<button type='button' onClick={ () => this.alert_parent( Core.cell_data_methods.DELETE, this.props.id)}>
							{ //<p>&#10006;</p></button> }
							<img src={IMG_TRASH} alt='delete cell' /></button>
						<button type='button' onClick={ () => this.alert_parent( Core.cell_ui_methods.CELL_MOVE_DOWN, this.props.id)}>
							<p>&#9660;</p></button>
					</div>
					<p className={ this.state.selected ? 'cell-id-prompt cell-id-prompt__selected' : 'cell-id-prompt'}> &#9664; [{ this.props.id + 1}]</p>
				</div>
			)
		}
	}
}

export default Cell;
