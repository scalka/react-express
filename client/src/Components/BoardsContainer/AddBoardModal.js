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

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add new board</p>
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <form onSubmit={this.addBoard}>
          <section className="modal-card-body">


              <div className="field">
                <label className="label">Board name:</label>
                <div className="control">
                  <input className="input" type='text' name="boardName" value={this.state.boardName} onChange={this.handleChange}/>
                </div>
              </div>




          </section>
          <footer className="modal-card-foot">
            <input className="button is-success" type="submit" value="Submit" />
            <button className="button">Cancel</button>
          </footer>
          </form>
        </div>
      </div>

    );
  }
}


export default AddBoardModal;
