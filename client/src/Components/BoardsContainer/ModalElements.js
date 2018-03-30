import React, { Component } from 'react';
import BoardsList from './BoardsList'

export const ModalHeader = (props) => {
  let header;
  if(props.url==='/addBoardToCollection') {
    header = 'Add new board to collection';
  } else if (props.url ==='/addItemToBoard') {
    header = 'Add item to board';
  }
   return (<p className="modal-card-title">{ header }</p>)
 }


export class ModalBody extends Component {
  constructor(props) {
      super(props);
      this.state = {
        boardName: ''
      };

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('handleChange modal body');
    // handle both of the <select> UI elements
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  render() {
    if(this.props.url ==='/addBoardToCollection') {
      return (
        <section className="modal-card-body">
          <div className="field">
            <label className="label">New Board Name:</label>
            <div className="control">
              <input className="input" type='text' name="boardName" value={this.props.value} onChange={this.props.handleChange}/>
            </div>
          </div>
        </section>
      )
    } else if (this.props.url ==='/addItemToBoard') {
      return (
          <section className="modal-card-body">
          <div className="field">
            <label className="label">Select board to add item:</label>
            <BoardsList name="boardName" value={this.state.boardName} handleChange={this.props.handleChange}/>
            <div className="control">
              <input className="input" type='text' name="boardName" value={this.props.value} onChange={this.props.handleChange}/>
            </div>
          </div>
        </section>
      )
    }
  }
}
