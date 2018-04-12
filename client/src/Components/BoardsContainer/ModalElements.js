import React, { Component } from 'react';
import BoardsListDropdown from './BoardsListDropdown';
import AddToDbModal from './AddToDbModal';

// modal Elements such as header and body to be reused in different modal types with various content depending on modal

export const ModalHeader = (props) => {
  let header;
  if(props.url === '/addBoardToCollection') {
    header = 'Add new board to collection';
  } else if (props.url === '/addItemToBoard') {
    header = 'Add item to board';
  }
  return (<p className="modal-card-title">{ header }</p>);
};

export const ModalBody = (props) => {
  if(props.url === '/addBoardToCollection') {
    return (
      <section className="modal-card-body">
        <div className="field">
          <label className="label">New Board Name:</label>
          <div className="control">
            <input className="input" type='text' name="boardName" value={props.value} onChange={props.handleChange}/>
          </div>
        </div>
      </section>
    );
  } else if (props.url === '/addItemToBoard') {
    return (
      <section className="modal-card-body">
        <BoardsListDropdown name="boardName" handleChange={props.handleChange}/>

      </section>
    );
  }
}
