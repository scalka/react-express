import React, { Component } from 'react';
import { fetchFromDb } from '../../buildUrl';

class BoardsAndItems extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }
  componentWillMount() {
    fetchFromDb('/boardsCollection').then( response => {
      this.setState({
        boards: response
      });
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
        <div className="container is-fluid">
          <div className="columns is-multiline is-4">
            {boards}
          </div>
        </div>
      </section>
    );
  }
}

export default BoardsAndItems;
