import React, { Component } from 'react';
import { fetchFromDb } from '../../buildUrl';

class AddItemModal extends Component {
  constructor(props) {
    super(props);

    this.addItemToBoard = this.addItemToBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addItemToBoard(event) {
    console.log('here' + this.props.item.listing_id);

    const url = '/addItemToBoard';
    const board = 'ssda';
    const body = JSON.stringify({
      boardName: 'ssda',
      item: {
        listing_id: this.props.item.listing_id,
        title: this.props.item.title,
        images: this.props.item.Images,
        tags: this.props.item.tags
      }
    });
    console.log(body);
    fetchFromDb(url, body);
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
            <p className="modal-card-title">Add new item to board</p>
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <form onSubmit={this.addItemToBoard}>
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


export default AddItemModal;
