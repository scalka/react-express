import React, { Component } from 'react';
import { fetchFromDb } from '../../buildUrl';
import AddToDbModal from './AddToDbModal';

class BoardsAndItems extends Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    fetchFromDb('/boardsCollection').then( response => {
      this.setState({
        boards: response
      });
    });
  }

  // open or close modal
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    let boards = this.state.boards.map(board => {
      let items = [];
      for (let item of board.items) {
        items.push(
          <div className="tile is-4 is-child" key={board.boardName + item.listing_id}>
            <img src={item.images[0].url_75x75} alt={item.title}/>
          </div>);
      }
      return(
        <div className="column is-4" key={board._id}>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                {board.boardName.toUpperCase()}
              </p>
            </header>
            <div className="card-content tile is-ancestor">
              <div className="tile is-parent">
                {items}
              </div>
            </div>
          </div>
        </div>);
    });

    return (
      <section className="section">
        <h1 className="has-text-primary title">BOARDS</h1>
        <button className="navbar-item " onClick={this.toggleModal}>ADD BOARD</button>
        
        <div className="container is-fluid">
          <div className="columns is-multiline is-4">
            {boards}
          </div>
        </div>
        {/*When the App component first renders, its isOpen state is false, so the Modal is not rendered*/}
        <AddToDbModal show={this.state.modalOpen} onClose={this.toggleModal} url='/addBoardToCollection'/>
      </section>
    );
  }
}

export default BoardsAndItems;
