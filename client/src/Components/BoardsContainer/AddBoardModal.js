import React, { Component } from 'react';

class AddBoardModal extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.addBoard = this.addBoard.bind(this);
  }

  addBoard() {
    console.log('click');

    fetch('/addBoardToCollection', {
      method: 'POST',
      body: JSON.stringify({username: 'Sylwia', name: 'board name 1'}),
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) return console.log('record added');
      throw new Error('Request failed');
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentWillMount() {


  }

  render() {
    console.log('modal');
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.onClose}></button>
      </div>
    );
  }
}


export default AddBoardModal;
