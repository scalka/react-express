import React, {Component} from 'react';
import {postToDb} from '../../dataHelperMethods';
import {ModalBody, ModalHeader} from './ModalElements';

class AddToDbModal extends Component {
  constructor() {
    super();
    this.state = {
      boardName: ''
    };
    this.handleSubmitToDbToCollection = this.handleSubmitToDbToCollection.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmitToDbToCollection(e, url) {
    let body;
    // if creates body for adding a board to db
    // if else creates a body for adding an item to the board
    if(url === '/addBoardToCollection') {
      //console.log("addBoardToCollection --- " + this.state.boardName);
      body = JSON.stringify({
        boardName: this.state.boardName,
        items: []
      });
    } else if (url === '/addItemToBoard') {
    //  console.log("addItemToBoard --- " + this.state.boardName);
      body = JSON.stringify({
        boardName: this.state.boardName,
        item: {
          listing_id: this.props.item.listing_id,
          title: this.props.item.title,
          images: this.props.item.Images,
          tags: this.props.item.tags
        }
      });
    }
    // sends a request to the db using a helper method from dataHelperMethods.js
    postToDb(url, body);
    // prevents appending default form requests to url
    e.preventDefault();
    // calls a click on a button and closes modal
    this.closeButton.click();
  }

  handleChange(event) {

    const name = event.target.name;
    //console.log(event.target.value);
    console.log("addtodbmodal" + name);
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
            <ModalHeader url={this.props.url}/>
            <button className="delete" aria-label="close" onClick={this.props.onClose}
              ref={ btn => this.closeButton = btn }></button>
          </header>
          <form onSubmit={ e => this.handleSubmitToDbToCollection(e, this.props.url) } >
            <ModalBody url={this.props.url} value={this.state.boardName} handleChange={this.handleChange}/>
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


export default AddToDbModal;
