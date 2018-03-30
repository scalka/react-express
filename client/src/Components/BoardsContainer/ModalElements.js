import React, { Component } from 'react';

export const ModalHeader = (props) => {
  console.log(props);
  let header;
  if(props.url==='/addBoardToCollection') {
    header = 'Add new board to collection';
  } else if (props.url ==='/addItemToBoard') {
    header = 'Add item to board';
  }
   return (<p className="modal-card-title">{ header }</p>)
 }

export class ModalBody extends Component {
  render() {
    if(this.props.url==='/addBoardToCollection') {
      return (
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Board name:</label>
            <div className="control">
              <input className="input" type='text' name="boardName" value={this.props.value} onChange={this.props.handleChange}/>
            </div>
          </div>
        </section>
      )
    } else if (this.props.url ==='/addItemToBoard') {
      this.header = 'Add item to board';
    }
  }
}
