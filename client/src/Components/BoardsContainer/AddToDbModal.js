import React, { Component } from 'react';
import { postToDb } from '../../buildUrl';
import { ModalHeader, ModalBody } from './ModalElements';

class AddToDbModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: ''
    };
    this.addBoard = this.addBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addBoard(e, url) {
    // console.log("outside --- " + this.state.boardName);
    let body;
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
    let add = postToDb(url, body);
    e.preventDefault();
    console.log(add);
  }

  handleChange(event) {
    const name = event.target.name;
    //console.log(event.target.value);
    //console.log(name);
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
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <form onSubmit={ e => this.addBoard(e, this.props.url) } >
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
