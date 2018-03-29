import React, { Component } from 'react';

class AddBoardModal extends Component {
  constructor() {
    super();
    this.state = {
      boardName: ''
    }
    this.addBoard = this.addBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addBoard(event) {

    fetch('/addBoardToCollection', {
      method: 'POST',
      body: JSON.stringify({username: 'Sylwia', boardName: this.state.boardName}),
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

  handleChange(event) {
    const name = event.target.name;
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit() {

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
          <form onSubmit={this.addBoard}>
            <label>Board name:
              <input type='text' name="boardName" value={this.state.boardName} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.onClose}></button>
      </div>
    );
  }
}


export default AddBoardModal;
