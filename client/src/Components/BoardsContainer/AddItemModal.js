import React, { Component } from 'react';


class AddItemModal extends Component {
  constructor() {
    super();
    this.state = {
      boardName: ''
    }
/*    this.addItemToBoard = this.addBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);*/
  }

  addItemToBoard(event) {
      fetch('/addItemToBoard', {
        method: 'POST',
        body: JSON.stringify({
          boardName: 'ssda',
          listing_id: this.props.id,
          title: this.props.title,
          images: this.props.images,
          tags: this.props.tags
        }),
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
    console.log(this.props.item);
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
